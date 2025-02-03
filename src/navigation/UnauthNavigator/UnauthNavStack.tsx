import { StyleSheet } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import LoginScreen from "../../features/login/LoginScreen";
import UnauthNavStackHeader from "./UnauthNavStackHeader";
import RegisterScreen from "src/features/register/RegisterScreen";
import RegisterSuccessScreen from "src/features/register/RegisterSuccessScreen";
import OnboardingScreen from "src/features/onboarding/OnboardingScreen";
import TrackNavigator from "src/features/track/TrackNavigator";
import RegisterOnboardingScreen from "src/features/register/RegisterOnboardingScreen";
import { Role } from "src/types/Role";
import { TrackType } from "src/features/track/types";
import CardLoginScreen from "src/features/admin/screens/CardLoginScreen/CardLoginScreen";
import OtpScreen from "src/features/otp/OtpScreen";
import ForgotPasswordScreen from "src/features/forgot-password/ForgotPasswordScreen";
import ResetPasswordScreen from "src/features/forgot-password/ResetPasswordScreen";
import UnauthSuccessScreen from "src/features/success/UnauthSuccessScreen";

export type UnauthNavParams = {
  onboarding: undefined;
  login: undefined;
  "register-onboarding": undefined;
  register: { role: Role.STUDENT | Role.PROF };
  "register-success": undefined;
  track: { trackType: TrackType };
  "card-login": { cardKey: string };
  "forgot-password": undefined;
  otp: { email: string; otp: string };
  "reset-password": { email: string };
  success: { message?: string };
};

export type UnauthNavProps = NativeStackNavigationProp<UnauthNavParams>;

const Stack = createNativeStackNavigator<UnauthNavParams>();

const UnauthNavStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{
        header: ({ navigation, route }) => (
          <UnauthNavStackHeader
            canGoBack={navigation.canGoBack()}
            routeName={route?.name}
          />
        ),
      }}
    >
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="register-onboarding"
        component={RegisterOnboardingScreen}
      />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="register-success" component={RegisterSuccessScreen} />
      <Stack.Screen name="track" component={TrackNavigator} />
      <Stack.Screen name="card-login" component={CardLoginScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
      <Stack.Screen name="otp" component={OtpScreen} />
      <Stack.Screen name="reset-password" component={ResetPasswordScreen} />
      <Stack.Screen name="success" component={UnauthSuccessScreen} />
    </Stack.Navigator>
  );
};

export default UnauthNavStack;

const styles = StyleSheet.create({});
