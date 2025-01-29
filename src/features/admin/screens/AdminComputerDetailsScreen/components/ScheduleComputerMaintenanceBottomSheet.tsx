// Libe
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// components
import Text from "src/components/Text";
import Button from "src/components/Button";

// hooks
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { getErrorMessage } from "src/services/helpers";
import DatePicker from "src/components/DatePicker/DatePicker";
import { createMaintenance } from "src/services/maintenance/createMaintenance";

interface ScheduleComputerMaintenanceBottomSheetProps {
  computerId: number;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

const ScheduleComputerMaintenanceBottomSheet = (
  props: ScheduleComputerMaintenanceBottomSheetProps
) => {
  // props
  const { computerId, bottomSheetRef } = props;

  // nav hooks
  const navigation = useAdminNavigation();

  // react hooks
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleDate, setMaintenanceDate] = useState<Date>(new Date());

  const navToSuccessScreen = (message: string) => {
    navigation?.reset({
      index: 2,
      routes: [
        {
          name: "main",
        },
        {
          name: "computers",
        },
        {
          name: "success",
          params: { message },
        },
      ],
    });
  };

  const onPressSchedule = async () => {
    setIsLoading(true);
    try {
      const res = await createMaintenance({
        computerId,
        scheduleDate,
      });
      if (res) {
        navToSuccessScreen("Successfully scheduled maintenance.");
      }
    } catch (err) {
      console.log("Error on press schedule maintenance =>", err);
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
            Schedule Maintenance
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Text variant="body1regular">
            Please select maintenance date to schedule maintenance of selected
            computer.
          </Text>
          <View style={styles.locationsContainer}>
            <DatePicker
              label={"Maintenance Date"}
              onChange={(newDate) => setMaintenanceDate(newDate)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={{ backgroundColor: COLORS.red }}
              title={"SCHEDULE MAINTENANCE"}
              onPress={onPressSchedule}
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

export default ScheduleComputerMaintenanceBottomSheet;

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
