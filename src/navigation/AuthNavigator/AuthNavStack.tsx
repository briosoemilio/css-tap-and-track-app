import { StyleSheet } from "react-native";
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
import ReportDetailsScreen from "src/features/report/ReportDetailsScreen";
import ChangeSectionScreen from "src/features/account/ChangeSectionScreen";
import LogsListScreen from "src/features/logs/LogsListScreen";
import AdminComputerLogsDetailsScreen from "src/features/admin/screens/AdminComputerLogsDetailsScreen/AdminComputerLogsDetailsScreen";
import ChangePasswordScreen from "src/features/account/ChangePasswordScreen";

export type AuthNavParams = {
  main: undefined;
  track: { trackType: TrackType };
  "time-in": { computerId: number };
  success: { message?: string };
  report: {
    id: number;
    tagType: TagType;
  };
  "report-details": {
    itemName: string;
    date: string;
    categoryName: string;
    remarks: string;
  };
  "change-section": undefined;
  logs: undefined;
  "logs-details": { computerIdentifier: string };
  "change-password": undefined;
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
      <AuthStack.Screen name="report-details" component={ReportDetailsScreen} />
      <AuthStack.Screen name="change-section" component={ChangeSectionScreen} />
      <AuthStack.Screen name="logs" component={LogsListScreen} />
      <AuthStack.Screen
        name="logs-details"
        component={AdminComputerLogsDetailsScreen}
      />
      <AuthStack.Screen
        name="change-password"
        component={ChangePasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavStack;

const styles = StyleSheet.create({});
