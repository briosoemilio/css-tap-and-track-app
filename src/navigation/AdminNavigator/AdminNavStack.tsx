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
import AdminLocationListScreen from "src/features/admin/screens/AdminLocationListScreen/AdminLocationListScreen";
import AdminReportsScreen from "src/features/admin/screens/AdminReportsScreen/AdminReportsScreen";
import AdminUsersListScreen from "src/features/admin/screens/AdminUsersListScreen/AdminUsersListScreen";
import { AdminReportCardInfo } from "src/features/admin/screens/AdminReportsScreen/components/AdminReportCard";

export type AdminNavParams = {
  main: undefined;
  track: { trackType: TrackType };
  account: undefined;
  inventory: undefined;
  "inventory-creator": undefined;
  "peripheral-details": { itemDetails: ItemDetails };
  success: { message?: string };
  "add-location": undefined;
  reports?: { reportsList?: AdminReportCardInfo[] };
  users: undefined;
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
      <AdminStack.Screen
        name="add-location"
        component={AdminLocationListScreen}
      />
      <AdminStack.Screen name="reports" component={AdminReportsScreen} />
      <AdminStack.Screen name="users" component={AdminUsersListScreen} />
    </AdminStack.Navigator>
  );
};

export default AdminNavStack;

const styles = StyleSheet.create({});
