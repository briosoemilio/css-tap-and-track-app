import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { MaintenanceDetails } from "src/services/maintenance/types";
import { useGetUserDetails } from "../../AdminUsersListScreen/hooks/useGetUserDetails";
import { useGetComputerDetails } from "../../AdminComputerDetailsScreen/hooks/useGetComputerDetails";
import { formatDate } from "src/helpers/formatDate";

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  maintenanceDetails: MaintenanceDetails;
}

const MaintenanceDetailsBottomSheet = (props: FilterBottomSheetProps) => {
  const { bottomSheetRef, maintenanceDetails } = props;

  const { userDetails: adminDetails } = useGetUserDetails(
    maintenanceDetails?.scheduledBy
  );

  const { computerDetails } = useGetComputerDetails(
    `${maintenanceDetails?.computerId}`
  );

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
            Maintenance Details
          </Text>
        </View>

        <View style={[styles.rowContainer, { marginTop: 12 }]}>
          <Text variant="body2bold" textAlign="left">
            Scheduled By:
          </Text>
          <Text variant="body2regular" textAlign="left">
            {adminDetails?.name}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Computer:
          </Text>
          <Text variant="body2regular" textAlign="left">
            {computerDetails?.name}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Location:
          </Text>
          <Text variant="body2regular" textAlign="left">
            {computerDetails?.locationName}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Maintenance Date:
          </Text>
          <Text variant="body2regular" textAlign="left">
            {formatDate(maintenanceDetails?.scheduleDate)}
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MaintenanceDetailsBottomSheet;

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
  rowContainer: {
    width: "100%",
    marginBottom: 12,
  },
});
