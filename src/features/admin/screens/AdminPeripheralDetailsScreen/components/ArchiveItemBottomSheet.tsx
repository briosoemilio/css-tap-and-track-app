// Libe
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// components
import Text from "src/components/Text";
import Loader from "src/components/Loader";
import Button from "src/components/Button";
import OptionCard from "./OptionCard";

// hooks
import { useLocationList } from "../../AdminInventoryListScreen/hooks/useLocationList";
import { updateItemLocation } from "src/services/item/updateItemLocation";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import AddIcon from "@assets/icons/inventory-list/add-icon.svg";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { getErrorMessage } from "src/services/helpers";
import { unarchiveItem } from "src/services/item/unarchiveItem";
import { archiveItem } from "src/services/item/archiveItem";

interface ArchiveItemBottomSheetProps {
  itemId: number;
  isArchived: boolean;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const ArchiveItemBottomSheet = (props: ArchiveItemBottomSheetProps) => {
  // props
  const { itemId, isArchived, bottomSheetRef } = props;

  const HEADER = isArchived
    ? "Do you want to activate item?"
    : "Do you want to archive item?";
  const MESSAGE = isArchived
    ? "Active peripherals are peripherals that can be detected by the app. Would you like to continue?"
    : `Archived peripherals are considered as soft-deleted items. Users won't see it anymore. \n\nComputers with archived peripherals as components are considered unusable. Would you like to continue?`;
  const BUTTON_TEST = isArchived ? "Activate Item" : "Archive Item";

  // nav hooks
  const navigation = useAdminNavigation();

  // react hooks
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleArchive = async () => {
    if (isArchived) {
      const res = await unarchiveItem(itemId);
      if (res) return navToSuccessScreen("Successfully unarchived item");
    }
    if (!isArchived) {
      const res = await archiveItem(itemId);
      if (res) return navToSuccessScreen("Successfully archived item");
    }
  };

  const navToSuccessScreen = (message: string) => {
    navigation?.reset({
      index: 2,
      routes: [
        {
          name: "main",
        },
        {
          name: "inventory",
        },
        {
          name: "success",
          params: { message },
        },
      ],
    });
  };

  const onPressArchive = async () => {
    setIsLoading(true);
    try {
      await toggleArchive();
    } catch (err) {
      console.log("Error on press archive item =>", err);
      const _errMessage = getErrorMessage(err);
      setErrMessage(_errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backgroundStyle={{ backgroundColor: COLORS.darkBlue }}
      index={-1}
      snapPoints={["50%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text variant="header3" textAlign="left">
            {HEADER}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <View style={styles.locationsContainer}>
            <Text>{MESSAGE}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={
                isArchived
                  ? { backgroundColor: COLORS.green }
                  : { backgroundColor: COLORS.red }
              }
              title={BUTTON_TEST}
              onPress={onPressArchive}
              isLoading={isLoading}
            />
            <Text variant="body2regular" style={{ color: COLORS.red }}>
              {errMessage}
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ArchiveItemBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
    flexGrow: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  locationsContainer: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
