import { StyleSheet } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AdminHomeScreen from "src/features/admin/screens/AdminHomeScreen";
import TrackNavigator from "src/features/track/TrackNavigator";
import { TrackType } from "src/features/track/types";

export type AdminNavParams = {
  main: undefined;
  track: { trackType: TrackType };
};

export type AdminNavProps = NativeStackNavigationProp<AdminNavParams>;

const AdminStack = createNativeStackNavigator();

const AdminNavStack = () => {
  return (
    <AdminStack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <AdminStack.Screen name="home" component={AdminHomeScreen} />
      <AdminStack.Screen name="track" component={TrackNavigator} />
    </AdminStack.Navigator>
  );
};

export default AdminNavStack;

const styles = StyleSheet.create({});
