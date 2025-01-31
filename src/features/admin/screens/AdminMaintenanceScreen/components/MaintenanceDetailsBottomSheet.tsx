import React, { useCallback, useState } from "react";
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
import Button from "src/components/Button";
import { markAsDone } from "src/services/maintenance/markAsDone";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  maintenanceDetails: MaintenanceDetails;
}

const MaintenanceDetailsBottomSheet = (props: FilterBottomSheetProps) => {
  const { bottomSheetRef, maintenanceDetails } = props;
  const { id, scheduledBy, computerId, isDone } = maintenanceDetails ?? {};
  const [isLoading, setIsLoading] = useState(false);

  const { userDetails: adminDetails } = useGetUserDetails(scheduledBy);
  const navigation = useAdminNavigation();

  const { computerDetails } = useGetComputerDetails(`${computerId}`);

  const onPressMarkAsDone = async () => {
    setIsLoading(true);
    try {
      const res = await markAsDone(id);
      if (res) {
        navigation?.reset({
          index: 2,
          routes: [
            {
              name: "main",
            },
            {
              name: "add-location",
            },
            {
              name: "success",
              params: {
                message: "Successfully marked the maintenance as done.",
              },
            },
          ],
        });
      }
    } catch (err) {
      console.log("Error marking maintenance as done");
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
            Maintenance Details
          </Text>
        </View>

        <View style={[styles.rowContainer, { marginTop: 12 }]}>
          <View style={styles.flex1}>
            <Text variant="body2bold" textAlign="left">
              Scheduled By:
            </Text>
            <Text variant="body2regular" textAlign="left">
              {adminDetails?.name}
            </Text>
          </View>
          <View style={styles.flex1}>
            <Text variant="body2bold" textAlign="left">
              Computer:
            </Text>
            <Text variant="body2regular" textAlign="left">
              {computerDetails?.name}
            </Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.flex1}>
            <Text variant="body2bold" textAlign="left">
              Location:
            </Text>
            <Text variant="body2regular" textAlign="left">
              {computerDetails?.locationName}
            </Text>
          </View>
          <View style={styles.flex1}>
            <Text variant="body2bold" textAlign="left">
              Maintenance Date:
            </Text>
            <Text variant="body2regular" textAlign="left">
              {formatDate(maintenanceDetails?.scheduleDate)}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.flex1}>
            <Text variant="body2bold" textAlign="left">
              Status:
            </Text>
            {isDone && (
              <Text
                variant="body2regular"
                textAlign="left"
                style={{ color: COLORS.green }}
              >
                DONE
              </Text>
            )}
            {!isDone && (
              <Text
                variant="body2regular"
                textAlign="left"
                style={{ color: COLORS.red }}
              >
                ONGOING
              </Text>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {!isDone && (
          <Button
            onPress={onPressMarkAsDone}
            title="Mark as Done"
            style={{ backgroundColor: COLORS.green }}
            isLoading={isLoading}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MaintenanceDetailsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
    display: "flex",
    height: "100%",
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
    display: "flex",
    flexDirection: "row",
  },
  flex1: { flex: 1 },
});
