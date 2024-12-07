import { StyleSheet, TextStyle, View } from "react-native";
import React, { useEffect, useState } from "react";
import Text, { FontVariantKeys } from "src/components/Text";
import { ComputerDetails } from "src/services/computer/types";
import useTimeLog from "src/hooks/useTimeLog";
import { COLORS } from "src/constants/colors";
import { ComputerLogDetails } from "src/services/computer-logs/types";
import { getComputerLogDetails } from "src/services/computer-logs/getComputerLogDetails";
import Button from "src/components/Button";
import TimeOutIcon from "@assets/icons/time-in/time-out.svg";
import { endComputerLog } from "src/services/computer-logs/endComputerLog";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

type ComputerInUseComponentProps = {
  computerDetails: ComputerDetails;
};

const ComputerInUseComponent = (props: ComputerInUseComponentProps) => {
  const { computerDetails } = props;
  const { secondsLeft, isRunning, startTimer, stopTimer } = useTimeLog();
  const [computerLogDetails, setComputerLogDetails] =
    useState<ComputerLogDetails>();
  const navigation = useAuthNavigation();

  const fetchLogDetails = async () => {
    try {
      const _computerLogDetails = await getComputerLogDetails(
        computerDetails.lastLogUUID
      );
      setComputerLogDetails(_computerLogDetails);
      const startDate = new Date(_computerLogDetails.startedAt).toISOString();
      startTimer(startDate);
    } catch (err) {
      console.log("Error fetching computer logs : ", err);
    }
  };

  const resetNav = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: "main" },
        { name: "time-in", params: { computerId: computerDetails?.id } },
      ],
    });
  };

  useEffect(() => {
    fetchLogDetails();
  }, []);

  const endTimeLog = async () => {
    await endComputerLog(computerLogDetails?.id as number);
    stopTimer();
    resetNav();
  };

  return (
    <View>
      <Text variant="header2" textAlign="center" style={{ color: COLORS.red }}>
        COMPUTER IN-USE
      </Text>
      <Text variant="body1regular" style={{ marginBottom: 12 }}>
        This computer is still being used:
      </Text>
      <View style={styles.detailsContainer}>
        <AttributeRow
          variant={"body2regular"}
          attributeName={"Name"}
          value={computerLogDetails?.user.name as string}
        />
        <AttributeRow
          variant={"body2regular"}
          attributeName={"ID Number"}
          value={computerLogDetails?.user.idNumber as string}
        />
        <AttributeRow
          variant={"body2regular"}
          attributeName={"Email Address"}
          value={computerLogDetails?.user.email as string}
        />
        <View style={styles.mt12}>
          <Text variant="body2bold">Try again in:</Text>
        </View>
        <Text
          variant="header2"
          style={{ color: COLORS.red }}
          textAlign="center"
        >
          {secondsLeft}
        </Text>
        <Button
          title="Time Out"
          left={<TimeOutIcon />}
          style={[
            styles.flex1,
            isRunning
              ? { backgroundColor: COLORS.disabledRed }
              : { backgroundColor: COLORS.red },
          ]}
          onPress={() => endTimeLog()}
          disabled={isRunning}
        />
      </View>
    </View>
  );
};

export default ComputerInUseComponent;

const AttributeRow = (props: {
  variant: FontVariantKeys;
  attributeName: string;
  value: string;
  valueStyle?: TextStyle;
}) => {
  const { variant, attributeName, value, valueStyle } = props;
  return (
    <View style={styles.flexRow}>
      <Text variant={variant} style={styles.flex1}>
        {attributeName}:
      </Text>
      <Text variant={variant} style={[styles.flex1, valueStyle]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex1: { flex: 1 },
  detailsContainer: {
    backgroundColor: COLORS.gray,
    padding: 12,
    borderRadius: 12,
  },
  mb12: { marginBottom: 12 },
  mt12: { marginTop: 12 },
});
