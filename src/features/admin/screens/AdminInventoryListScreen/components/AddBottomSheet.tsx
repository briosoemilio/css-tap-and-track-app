import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const AddBottomSheet = (props: FilterBottomSheetProps) => {
  const navigation = useAdminNavigation();
  const { bottomSheetRef, onOpen } = props;
  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen(); // Call `onOpen` when the bottom sheet is opened
      }
    },
    [onOpen]
  );

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
            Inventory Tools
          </Text>
        </View>
        <View style={{ marginTop: 15, gap: 15 }}>
          <Button
            title="Add Location"
            onPress={() => navigation?.navigate("add-location")}
          />
          <Button
            title="Add Item"
            onPress={() => navigation?.navigate("inventory-creator")}
          />
          <Button
            title="Add Category"
            onPress={() => navigation?.navigate("add-category")}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AddBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
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
  toolContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
  },
});
