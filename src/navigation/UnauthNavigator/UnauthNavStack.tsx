import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../features/login/LoginScreen";
import UnauthNavStackHeader from "./UnauthNavStackHeader";
import RegisterScreen from "src/features/register/RegisterScreen";
import RegisterSuccessScreen from "src/features/register/RegisterSuccessScreen";
import OnboardingScreen from "src/features/onboarding/OnboardingScreen";

const Stack = createNativeStackNavigator();

const UnauthNavStack = () => {
  const { onLogin } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{
        header: () => <UnauthNavStackHeader />,
      }}
    >
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="register-success" component={RegisterSuccessScreen} />
    </Stack.Navigator>
  );
};

export default UnauthNavStack;

const styles = StyleSheet.create({});
