import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import Button from "src/components/Button";
import TimeInIcon from "@assets/icons/time-in/time-in.svg";
import TimeOutIcon from "@assets/icons/time-in/time-out.svg";
import TimerIcon from "@assets/icons/time-in/timer.svg";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { format } from "date-fns";
import AsyncStorage from "src/lib/storage/storage";
import useTimeLog from "src/hooks/useTimeLog";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthNavParams } from "src/navigation/AuthNavigator/AuthNavStack";
import { ComputerDetails } from "src/services/computer/types";
import { getComputerDetails } from "src/services/computer/getComputerDetails";
import { ItemStatus } from "src/types/ItemStatus";
import ComputerInUseComponent from "../component/ComputerInUseComponent";
import ComputerUnderMaintenanceComponent from "../component/ComputerUnderMaintenanceComponent";
import ComputerRunningComponent from "../component/ComputerRunningComponent";

const TimeInScreen = () => {
  const navigation = useAuthNavigation();
  const route = useRoute<RouteProp<AuthNavParams, "time-in">>();
  const { computerId } = route.params;
  const [computerDetails, setComputerDetails] = useState<ComputerDetails>();

  const loadDetails = async () => {
    try {
      const _computerDetails = await getComputerDetails(computerId);
      setComputerDetails(_computerDetails);
    } catch (err) {
      console.log("loadDetails error => ", err);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TextFieldOutline
          label={"Computer"}
          value={computerDetails?.name as string}
          containerStyle={[styles.mb24, styles.mt50]}
          editable={false}
        />
        <TextFieldOutline
          label={"Date"}
          value={"09/27/2024"}
          containerStyle={styles.mb24}
          editable={false}
        />
        {computerDetails?.status === ItemStatus.AVAILABLE && (
          <ComputerRunningComponent computerDetails={computerDetails} />
        )}
        {computerDetails?.status === ItemStatus.IN_USE && (
          <ComputerInUseComponent computerDetails={computerDetails} />
        )}
        {computerDetails?.status === ItemStatus.UNDER_MAINTENANCE && (
          <ComputerUnderMaintenanceComponent
            computerDetails={computerDetails}
          />
        )}
      </ScrollView>
      <View style={styles.backButtonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};

export default TimeInScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  backButtonContainer: { paddingHorizontal: CONSTANTS.layout },
  mb24: { marginBottom: 24 },
  mt50: { marginTop: 50 },
  buttonContainers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  remainingTimeHeader: {
    backgroundColor: COLORS.red,
    padding: 12,
  },
  remainingTimeContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  remainingTimeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.navyBlue,
    height: 200,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  timeInButton: { flex: 1, marginRight: 12 },
  timeOutButton: { flex: 1, backgroundColor: COLORS.red },
});
