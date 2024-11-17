import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/HomeScreen";
import AccountScreen from "../../features/account/AccountScreen";
import ReportScreen from "../../features/report/ReportScreen";
import { BottomNavParams } from "./BottomNavParams";

import HomeIcon from "@assets/icons/home-icon.svg";
import ReportIcon from "@assets/icons/report-icon.svg";
import AccountIcon from "@assets/icons/account-icon.svg";
import Text from "src/components/Text";
import { capitalize } from "lodash";
import { COLORS } from "src/constants/colors";
import ReportListScreen from "src/features/report/ReportListScreen";

export const BottomStack = createBottomTabNavigator<BottomNavParams>();

const BottomTabNavStack = () => {
  return (
    <BottomStack.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          const icon = () => {
            switch (route.name) {
              case "home":
                return <HomeIcon />;
              case "report":
                return <ReportIcon />;
              case "account":
                return <AccountIcon />;
            }
          };
          return icon();
        },
        tabBarLabel: () => (
          <Text variant="body3bold">{capitalize(route.name)}</Text>
        ),
        tabBarActiveBackgroundColor: COLORS.darkBlue,
        tabBarItemStyle: {
          paddingVertical: 6,
          marginHorizontal: 8,
          marginVertical: 6,
          borderRadius: 8,
          gap: 6,
          minHeight: 50,
        },
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          borderTopWidth: 0,
          minHeight: 65,
          backgroundColor: COLORS.black,
        },
      })}
    >
      <BottomStack.Screen name={"home"} component={HomeScreen} />
      <BottomStack.Screen name={"account"} component={AccountScreen} />
      <BottomStack.Screen name={"report"} component={ReportListScreen} />
    </BottomStack.Navigator>
  );
};

export default BottomTabNavStack;

const styles = StyleSheet.create({});
