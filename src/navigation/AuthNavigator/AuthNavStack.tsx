import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AuthNavParams } from "./AuthNavParams";
import BottomTabNavStack from "./BottomTabNavStack";
import HomeScreen from "../../features/home/HomeScreen";

export type AuthNavProps = NativeStackNavigationProp<AuthNavParams>;

const AuthStack = createNativeStackNavigator();

const AuthNavStack = () => {
  return (
    <AuthStack.Navigator initialRouteName="main">
      <AuthStack.Screen
        name="main"
        component={BottomTabNavStack}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavStack;

const styles = StyleSheet.create({});
