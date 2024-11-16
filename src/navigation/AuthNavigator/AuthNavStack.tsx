import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import BottomTabNavStack from "./BottomTabNavStack";
import TrackNavigator from "src/features/track/TrackNavigator";
import TimeInScreen from "src/features/timein/screens/TimeInScreen";
import { TagType, TrackType } from "src/features/track/types";
import SuccessScreen from "src/features/success/SuccessScreen";
import ReportScreen from "src/features/report/ReportScreen";
import BackIcon from "@assets/icons/back-icon.svg";

export type AuthNavParams = {
  main: undefined;
  track: { trackType: TrackType };
  "time-in": { computerId: number };
  success: { message?: string };
  report: {
    id: number;
    tagType: TagType;
  };
};

export type AuthNavProps = NativeStackNavigationProp<AuthNavParams>;

const AuthStack = createNativeStackNavigator();

const AuthNavStack = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="main"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="main" component={BottomTabNavStack} />
      <AuthStack.Screen name="track" component={TrackNavigator} />
      <AuthStack.Screen name="time-in" component={TimeInScreen} />
      <AuthStack.Screen name="success" component={SuccessScreen} />
      <AuthStack.Screen name="report" component={ReportScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavStack;

const styles = StyleSheet.create({});
