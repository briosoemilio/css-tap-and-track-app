import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import TimerIcon from "@assets/icons/time-in/timer.svg";

const ComputerRunningComponent = (props: { secondsLeft: string }) => {
  const { secondsLeft } = props;
  return (
    <View>
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
});
