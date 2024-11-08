import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import BottomTabNavStack from "./BottomTabNavStack";
import HomeScreen from "../../features/home/HomeScreen";
import TrackNavigator from "src/features/track/TrackNavigator";

export type AuthNavParams = {
  main: undefined;
  track: undefined;
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
    </AuthStack.Navigator>
  );
};

export default AuthNavStack;

const styles = StyleSheet.create({});
