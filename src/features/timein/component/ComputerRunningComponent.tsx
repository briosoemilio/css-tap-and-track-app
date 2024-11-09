import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import TimerIcon from "@assets/icons/time-in/timer.svg";
import { ComputerDetails } from "src/services/computer/types";
import useTimeLog from "src/hooks/useTimeLog";
import Button from "src/components/Button";
import TimeInIcon from "@assets/icons/time-in/time-in.svg";
import TimeOutIcon from "@assets/icons/time-in/time-out.svg";

const ComputerRunningComponent = (props: {
  computerDetails: ComputerDetails;
}) => {
  const { secondsLeft, isRunning, startTimer, stopTimer } = useTimeLog();
  return (
    <View>
      <View style={styles.buttonContainers}>
        <Button
          title="Time In"
          left={<TimeInIcon />}
          style={styles.timeInButton}
          onPress={() => startTimer()}
        />
        <Button
          title="Time Out"
          left={<TimeOutIcon />}
          style={styles.timeOutButton}
          onPress={() => stopTimer()}
        />
      </View>
      <View style={styles.remainingTimeHeader}>
        <Text variant="body1bold">Session Timeout</Text>
      </View>
      <View style={styles.remainingTimeContainer}>
        <View style={styles.remainingTimeContent}>
          <TimerIcon />
          <Text variant="body2regular" style={{ marginLeft: 12 }}>
            Remaining Time
          </Text>
        </View>
        <Text variant="header2">{secondsLeft}</Text>
      </View>
    </View>
  );
};

export default ComputerRunningComponent;

const styles = StyleSheet.create({
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
  buttonContainers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  timeInButton: { flex: 1, marginRight: 12 },
  timeOutButton: { flex: 1, backgroundColor: COLORS.red },
});
