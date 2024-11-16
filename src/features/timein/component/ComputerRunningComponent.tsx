import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { getComputerLogDetails } from "src/services/computer-logs/getComputerLogDetails";
import Modal from "src/components/Modal";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import TimeOutModal from "./TimeOutModal";
import ErrorModal from "./ErrorModal";
import { ComputerLogDetails } from "src/services/computer-logs/types";
import { getErrorMessage } from "src/services/helpers";
import { ERROR_MESSAGES } from "../constants";

const ComputerRunningComponent = (props: {
  computerDetails: ComputerDetails;
  isSameUser: boolean;
}) => {
  const { computerDetails, isSameUser } = props;
  const { secondsLeft, startTimer, stopTimer, isRunning } = useTimeLog();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"time-out" | "error">();
  const [computerLogDetails, setComputerLogDetails] =
    useState<ComputerLogDetails>();
  const [errorPCDetails, setErrorPCDetails] = useState<ComputerDetails>();
  const navigation = useAuthNavigation();

  const loadLogDetails = async () => {
    try {
      const _logDetails = await getComputerLogDetails(
        computerDetails?.lastLogUUID
      );
      setComputerLogDetails(_logDetails);

      if (_logDetails?.endedAt !== null) return; // if already ended dont start timer

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
    try {
      await createComputerLog({
        computerId: computerDetails.id,
      });
      startTimer();
    } catch (err: any) {
      console.log("Error time in -> ", err);
      const errMessage = getErrorMessage(err);
      if (errMessage === ERROR_MESSAGES.ALREADY_LOGGED_IN) {
        const { computer: errorComputer } = JSON.parse(err.message);
        setErrorPCDetails(errorComputer);
        openModal("error");
      }
    }
  };

  const openModal = (type: "time-out" | "error") => {
    setShowModal(true);
    setModalType(type);
  };

  const timeOut = async (logUUID?: string) => {
    try {
      await endComputerLog(logUUID || computerDetails?.lastLogUUID);
      stopTimer();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "success",
            params: { message: "Successfully timed out of PC" },
          },
        ],
      });
    } catch (err) {
      console.log("Error occured during time out -> ", err);
    }
  };

  return (
    <>
      <View>
        <View style={styles.buttonContainers}>
          <Button
            title="Time In"
            left={<TimeInIcon />}
            style={[
              styles.timeInButton,
              isRunning && { backgroundColor: COLORS.lightGray },
            ]}
            onPress={() => timeIn()}
            disabled={isRunning}
          />
          <Button
            title="Time Out"
            left={<TimeOutIcon />}
            style={[
              styles.timeOutButton,
              isRunning == false && { backgroundColor: COLORS.lightGray },
            ]}
            onPress={() => openModal("time-out")}
            disabled={isRunning == false}
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

      {/* Modals */}
      {modalType === "time-out" && (
        <TimeOutModal
          showModal={showModal}
          setShowModal={setShowModal}
          timeOut={timeOut}
        />
      )}

      {modalType === "error" && (
        <ErrorModal
          showModal={showModal}
          setShowModal={setShowModal}
          timeOut={() => timeOut(errorPCDetails?.lastLogUUID)}
          computerName={errorPCDetails?.name as unknown as string}
          lastLog={computerLogDetails?.createdAt as unknown as string}
        />
      )}
    </>
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
