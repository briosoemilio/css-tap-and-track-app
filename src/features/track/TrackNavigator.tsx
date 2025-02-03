import { StyleSheet } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import ChooseTrackScreen from "./screens/ChooseTrackScreen";
import QRTrackScreen from "./screens/QRTrackScreen";
import PeripheralDetailsScreen from "./screens/PeripheralDetailsScreen";
import UnauthNavStackHeader from "src/navigation/UnauthNavigator/UnauthNavStackHeader";
import NFCTrackScreen from "./screens/NfcTrackScreen";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthNavParams } from "src/navigation/AuthNavigator/AuthNavStack";
import { TagType, TrackType } from "./types";

export type TrackNavParams = {
  "choose-track": undefined;
  nfc: { trackType?: TrackType };
  qr: { trackType?: TrackType };
  "peripheral-details": {
    id: number;
    tagType: TagType;
  };
};

export type TrackNavProps = NativeStackNavigationProp<TrackNavParams>;

const Stack = createNativeStackNavigator<TrackNavParams>();

type TrackNavigatorProps = {
  withHeader?: boolean;
};

const TrackNavigator = (props: TrackNavigatorProps) => {
  const { withHeader = false } = props;
  const route = useRoute<RouteProp<AuthNavParams, "track">>();
  const trackType = route.params?.trackType;
  return (
    <Stack.Navigator
      initialRouteName="choose-track"
      screenOptions={{
        headerShown: withHeader,
        header: ({ navigation, route }) => (
          <UnauthNavStackHeader
            canGoBack={navigation.canGoBack()}
            routeName={route?.name}
          />
        ),
      }}
    >
      <Stack.Screen name="choose-track" component={ChooseTrackScreen} />
      <Stack.Screen
        name="nfc"
        component={NFCTrackScreen}
        initialParams={{ trackType }}
      />
      <Stack.Screen
        name="qr"
        component={QRTrackScreen}
        initialParams={{ trackType }}
      />
      <Stack.Screen
        name="peripheral-details"
        component={PeripheralDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default TrackNavigator;

const styles = StyleSheet.create({});
