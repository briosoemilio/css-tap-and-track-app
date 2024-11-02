import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../features/login/LoginScreen";
import UnauthNavStackHeader from "./UnauthNavStackHeader";

const Stack = createNativeStackNavigator();

const UnauthNavStack = () => {
  const { onLogin } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        header: () => <UnauthNavStackHeader />,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default UnauthNavStack;

const styles = StyleSheet.create({});
