import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import TimerIcon from "@assets/icons/time-in/timer.svg";
import { ComputerDetails } from "src/services/computer/types";
import useTimeLog from "src/hooks/useTimeLog";
import Button from "src/components/Button";
import TimeInIcon from "@assets/icons/time-in/time-in.svg";
import TimeOutIcon from "@assets/icons/time-in/time-out.svg";
import { createComputerLog } from "src/services/computer-logs/createComputerLog";
import { endComputerLog } from "src/services/computer-logs/endComputerLog";
import { ComputerLogDetails } from "src/services/computer-logs/types";
import { getComputerLogDetails } from "src/services/computer-logs/getComputerLogDetails";

const ComputerRunningComponent = (props: {
  computerDetails: ComputerDetails;
  isSameUser: boolean;
}) => {
  const { computerDetails, isSameUser } = props;
  const { secondsLeft, startTimer, stopTimer } = useTimeLog();
  const [computerLogDetails, setComputerLogDetails] =
    useState<ComputerLogDetails>();

  const loadLogDetails = async () => {
    try {
      const _logDetails = await getComputerLogDetails(
        computerDetails?.lastLogUUID
      );
      setComputerLogDetails(_logDetails);

      if (isSameUser) {
        const startedAt = _logDetails?.startedAt as unknown as string;
        startTimer(startedAt);
      }
    } catch (err) {
      console.log("Error loading computer log details -> ", err);
    }
  };
  useEffect(() => {
    loadLogDetails();
  }, []);

  const timeIn = async () => {
    await createComputerLog({
      computerId: computerDetails.id,
    });
    startTimer();
  };

  const timeOut = async () => {
    await endComputerLog(computerDetails?.lastLogUUID);
    stopTimer();
  };
  return (
    <View>
      <View style={styles.buttonContainers}>
        <Button
          title="Time In"
          left={<TimeInIcon />}
          style={[
            styles.timeInButton,
            isSameUser && { backgroundColor: COLORS.lightGray },
          ]}
          onPress={() => timeIn()}
          disabled={isSameUser}
        />
        <Button
          title="Time Out"
          left={<TimeOutIcon />}
          style={[
            styles.timeOutButton,
            secondsLeft === "03:00:00" && { backgroundColor: COLORS.lightGray },
          ]}
          onPress={() => timeOut()}
          disabled={secondsLeft === "03:00:00"}
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
        {secondsLeft === "00:00:00" && (
          <Text
            variant="body3regular"
            textAlign="center"
            style={{ marginTop: 24 }}
          >
            {`Your time is up. \n Please TIME OUT for the next user.`}
          </Text>
        )}
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
