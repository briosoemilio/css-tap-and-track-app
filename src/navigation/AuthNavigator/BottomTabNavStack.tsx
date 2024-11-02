import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../features/home/HomeScreen";
import AccountScreen from "../../features/account/AccountScreen";
import ReportScreen from "../../features/report/ReportScreen";
import { BottomNavParams } from "./BottomNavParams";

export const BottomStack = createBottomTabNavigator<BottomNavParams>();

const BottomTabNavStack = () => {
  return (
    <BottomStack.Navigator initialRouteName="home">
      <BottomStack.Screen name={"home"} component={HomeScreen} />
      <BottomStack.Screen name={"account"} component={AccountScreen} />
      <BottomStack.Screen name={"report"} component={ReportScreen} />
    </BottomStack.Navigator>
  );
};

export default BottomTabNavStack;

const styles = StyleSheet.create({});
