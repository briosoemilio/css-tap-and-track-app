// Libe
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// components
import Text from "src/components/Text";
import Button from "src/components/Button";
import OptionCard from "./OptionCard";

// hooks
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { getErrorMessage } from "src/services/helpers";
import { ItemStatus } from "src/types/ItemStatus";
import { updateItemStatus } from "src/services/item/updateItemStatus";
import { parseCategoryName } from "../../AdminInventoryListScreen/utils";

interface UpdateStatusBottomSheetProps {
  itemId: number;
  itemStatus: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const UpdateStatusBottomSheet = (props: UpdateStatusBottomSheetProps) => {
  // props
  const { itemId, itemStatus, bottomSheetRef, onOpen } = props;

  // nav hooks
  const navigation = useAdminNavigation();

  // custom hooks
  const statusList = [
    { name: ItemStatus.AVAILABLE },
    { name: ItemStatus.IN_USE },
    { name: ItemStatus.UNDER_MAINTENANCE },
  ];

  // react hooks
  const [selectedStatus, setStatus] = useState(itemStatus);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // functions
  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen(); // Call `onOpen` when the bottom sheet is opened
      }
    },
    [onOpen]
  );

  const onPressSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateItemStatus(itemId, selectedStatus);
      if (res) {
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
              params: { message: "Successfully updated Item Status" },
            },
          ],
        });
      }
    } catch (err) {
      console.log("Error on press ssave =>", err);
      const _errMessage = getErrorMessage(err);
      setErrMessage(_errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={(index: number) => onSheetChange(index)}
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
            Update Status
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
            {statusList.map((status, index) => (
              <OptionCard
                optionText={parseCategoryName(status.name)}
                key={`status-${index}`}
                isSelected={status.name === selectedStatus}
                onPress={() => setStatus(status.name)}
              />
            ))}
          </View>
          <View>
            <Button
              title="Save"
              style={{
                backgroundColor:
                  itemStatus === selectedStatus
                    ? COLORS.disabledGreen
                    : COLORS.green,
              }}
              disabled={itemStatus === selectedStatus}
              onPress={onPressSave}
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

export default UpdateStatusBottomSheet;

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
});
