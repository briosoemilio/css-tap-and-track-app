import { StyleSheet } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AdminHomeScreen from "src/features/admin/screens/AdminHomeScreen";
import TrackNavigator from "src/features/track/TrackNavigator";
import { TrackType } from "src/features/track/types";
import AdminAccounSettingsScreen from "src/features/admin/screens/AdminAccountSettingsScreen";
import AdminNavStackHeader from "./AdminNavStackHeader";
import AdminInventoryListScreen from "src/features/admin/screens/AdminInventoryListScreen/AdminInventoryListScreen";
import AdminInventoryCreatorScreen from "src/features/admin/screens/AdminInventoryCreatorScreen/AdminInventoryCreatorScreen";
import AdminPeripheralDetailsScreen from "src/features/admin/screens/AdminPeripheralDetailsScreen/AdminPeripheralDetailsScreen";
import { ItemDetails } from "src/services/item/types";
import SuccessScreen from "src/features/success/SuccessScreen";

export type AdminNavParams = {
  main: undefined;
  track: { trackType: TrackType };
  account: undefined;
  inventory: undefined;
  "inventory-creator": undefined;
  "peripheral-details": { itemDetails: ItemDetails };
  success: { message?: string };
};

export type AdminNavProps = NativeStackNavigationProp<AdminNavParams>;

const AdminStack = createNativeStackNavigator();

const AdminNavStack = () => {
  return (
    <AdminStack.Navigator
      initialRouteName="main"
      screenOptions={{
        header: ({ navigation, route }) => (
          <AdminNavStackHeader
            canGoBack={navigation?.canGoBack()}
            routeName={route?.name}
            params={route?.params}
          />
        ),
      }}
    >
      <AdminStack.Screen name="main" component={AdminHomeScreen} />
      <AdminStack.Screen name="track" component={TrackNavigator} />
      <AdminStack.Screen name="account" component={AdminAccounSettingsScreen} />
      <AdminStack.Screen
        name="inventory"
        component={AdminInventoryListScreen}
      />
      <AdminStack.Screen
        name="inventory-creator"
        component={AdminInventoryCreatorScreen}
      />
      <AdminStack.Screen
        name="peripheral-details"
        component={AdminPeripheralDetailsScreen}
      />
      <AdminStack.Screen name="success" component={SuccessScreen} />
    </AdminStack.Navigator>
  );
};

export default AdminNavStack;

const styles = StyleSheet.create({});
