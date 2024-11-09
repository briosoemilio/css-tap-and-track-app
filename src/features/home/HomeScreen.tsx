import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "src/context/auth/useAuth";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { getCurrentTime } from "src/helpers/getCurrentTime";
import { getCurrentDayOfTheWeek } from "src/helpers/getCurrentDayOfTheWeek";

import TimeInIcon from "@assets/icons/home/timein-icon.svg";
import ReportIcon from "@assets/icons/home/report-icon.svg";
import TrackIcon from "@assets/icons/home/track-icon.svg";
import { COLORS } from "src/constants/colors";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import { useTrackNavigation } from "../track/useTrackNavigation";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

const HomeIcon = (props: { type: "time-in" | "report" | "track" }) => {
  const navigation = useAuthNavigation();
  const { type } = props;
  const icon = () => {
    switch (type) {
      case "time-in":
        return {
          icon: <TimeInIcon />,
          text: "Time - in",
          onPress: () => navigation.navigate("time-in"),
        };
      case "report":
        return {
          icon: <ReportIcon />,
          text: "Report this PC",
          onPress: () => showUnderDevelopment(),
        };
      case "track":
        return {
          icon: <TrackIcon />,
          text: "Track Here",
          onPress: () => navigation.navigate("track"),
        };
    }
  };

  return (
    <TouchableOpacity onPress={() => icon().onPress()} style={styles.homeIcon}>
      {icon().icon}
      <Text variant="body2bold" style={{ marginTop: 12 }}>
        {icon().text}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const { user } = useAuth();

  const currentTime = getCurrentTime();
  const currentDay = getCurrentDayOfTheWeek();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text variant="body1bold" style={styles.helloText}>
            Hello, {user?.name}
          </Text>

          <View>
            <Text variant="headerInstrument1">It's</Text>
            <Text variant="header2">{currentTime}</Text>
            <Text variant="headerInstrument1">{currentDay}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <HomeIcon type="time-in" />
          <HomeIcon type="report" />
          <HomeIcon type="track" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: "space-evenly",
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  homeIcon: {
    backgroundColor: COLORS.teal,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  helloText: { marginBottom: 36 },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
    paddingHorizontal: 36,
  },
});
