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

const TimeInScreen = () => {
  const navigation = useAuthNavigation();
  const { secondsLeft, isRunning, startTimer, stopTimer } = useTimeLog();

  const test = async () => {
    const time = await AsyncStorage.getItem("time-in-log");
    console.log({ time });
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TextFieldOutline
          label={"Computer"}
          value={"Computer_1"}
          containerStyle={[styles.mb24, styles.mt50]}
        />
        <TextFieldOutline
          label={"Date"}
          value={"09/27/2024"}
          containerStyle={styles.mb24}
        />
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
        {isRunning && (
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
