import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import ChooseTrackScreen from "./screens/ChooseTrackScreen";
import QRTrackScreen from "./screens/QRTrackScreen";
import PeripheralDetailsScreen from "./screens/PeripheralDetailsScreen";
import UnauthNavStackHeader from "src/navigation/UnauthNavigator/UnauthNavStackHeader";
import NFCTrackScreen from "./screens/NfcTrackScreen";

export type TrackNavParams = {
  "choose-track": undefined;
  nfc: undefined;
  qr: undefined;
  "peripheral-details": undefined;
};

export type TrackNavProps = NativeStackNavigationProp<TrackNavParams>;

const Stack = createNativeStackNavigator<TrackNavParams>();

type TrackNavigatorProps = {
  withHeader?: boolean;
};

const TrackNavigator = (props: TrackNavigatorProps) => {
  const { withHeader = false } = props;
  return (
    <Stack.Navigator
      initialRouteName="choose-track"
      screenOptions={{
        header: () => <UnauthNavStackHeader />,
        headerShown: withHeader,
      }}
    >
      <Stack.Screen name="choose-track" component={ChooseTrackScreen} />
      <Stack.Screen name="nfc" component={NFCTrackScreen} />
      <Stack.Screen name="qr" component={QRTrackScreen} />
      <Stack.Screen
        name="peripheral-details"
        component={PeripheralDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default TrackNavigator;

const styles = StyleSheet.create({});
