import { StyleSheet } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AdminHomeScreen from "src/features/admin/screens/AdminHomeScreen";
import TrackNavigator from "src/features/track/TrackNavigator";
import { TagType, TrackType } from "src/features/track/types";
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
import AdminComputersListScreen from "src/features/admin/screens/AdminComputersListScreen/AdminComputersListScreen";
import AdminComputerDetailsScreen from "src/features/admin/screens/AdminComputerDetailsScreen/AdminComputerDetailsScreen";
import { ComputerDetails } from "src/services/computer/types";
import AdminComputerLogsListScreen from "src/features/admin/screens/AdminComputerLogsListScreen/AdminComputerLogsListScreen";
import AdminComputerLogsDetailsScreen from "src/features/admin/screens/AdminComputerLogsDetailsScreen/AdminComputerLogsDetailsScreen";
import AdminComputerCreatorScreen, {
  ComputerCreatorForm,
} from "src/features/admin/screens/AdminComputerCreatorScreen/AdminComputerCreatorScreen";
import AdminComputerPeripheralSelectScreen from "src/features/admin/screens/AdminComputerCreatorScreen/AdminComputerPeripheralSelectScreen";
import { FormProvider, useForm } from "react-hook-form";
import AdminCategoryListScreen from "src/features/admin/screens/AdminCategoryListScreen/AdminCategoryListScreen";
import AdminAddCardScreen from "src/features/admin/screens/AdminAddCardScreen/AdminAddCardScreen";
import AdminWriteTagScreen from "src/features/admin/screens/AdminWriteTagScreen/AdminWriteTagScreen";
import AdminReportSummaryScreen from "src/features/admin/screens/AdminReportsScreen/AdminReportSummaryScreen";
import { GenerateReportResData } from "src/services/report/types";
import AdminMaintenanceScreen from "src/features/admin/screens/AdminMaintenanceScreen/AdminMaintenanceScreen";
import CardKeyLinkScreen from "src/features/card-key/screens/CardKeyLinkScreen/CardKeyLinkScreen";
import CardKeyOnboardingScreen from "src/features/card-key/screens/CardKeyOnboardingScreen/CardKeyOnboardingScreen";

export type AdminNavParams = {
  main: undefined;
  track: { trackType: TrackType };
  account: undefined;
  inventory: undefined;
  "inventory-creator": undefined;
  "peripheral-details": { itemDetails: ItemDetails };
  success: { message?: string };
  "add-location": undefined;
  "add-category": undefined;
  "add-admin": undefined;
  reports?: { reportsList?: AdminReportCardInfo[] };
  "reports-summary": { reportSummary: GenerateReportResData };
  users: undefined;
  computers: undefined;
  "computer-details": { computerDetails: ComputerDetails };
  "computer-logs"?: { computerIdentifier: string | number };
  "computer-logs-details": { computerIdentifier: string };
  "computer-creator": undefined;
  "computer-peripheral-select": { location: string; category: string };
  "write-tag": { tagType: TagType; id: number };
  maintenance: undefined;
};

export type AdminNavProps = NativeStackNavigationProp<AdminNavParams>;

const AdminStack = createNativeStackNavigator();

const AdminNavStack = () => {
  const methods = useForm<ComputerCreatorForm>();
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
      <AdminStack.Screen
        name="add-category"
        component={AdminCategoryListScreen}
      />
      <AdminStack.Screen name="reports" component={AdminReportsScreen} />
      <AdminStack.Screen
        name="reports-summary"
        component={AdminReportSummaryScreen}
      />
      <AdminStack.Screen name="users" component={AdminUsersListScreen} />
      <AdminStack.Screen
        name="computers"
        component={AdminComputersListScreen}
      />
      <AdminStack.Screen
        name="computer-details"
        component={AdminComputerDetailsScreen}
      />
      <AdminStack.Screen
        name="computer-logs"
        component={AdminComputerLogsListScreen}
      />
      <AdminStack.Screen
        name="computer-logs-details"
        component={AdminComputerLogsDetailsScreen}
      />

      <AdminStack.Screen
        name="computer-creator"
        children={() => (
          <FormProvider {...methods}>
            <AdminComputerCreatorScreen />
          </FormProvider>
        )}
      />
      <AdminStack.Screen
        name="computer-peripheral-select"
        children={() => (
          <FormProvider {...methods}>
            <AdminComputerPeripheralSelectScreen />
          </FormProvider>
        )}
      />
      <AdminStack.Screen name="add-admin" component={AdminAddCardScreen} />
      <AdminStack.Screen name="write-tag" component={AdminWriteTagScreen} />
      <AdminStack.Screen
        name="maintenance"
        component={AdminMaintenanceScreen}
      />
      <AdminStack.Screen
        name="card-key-onboarding"
        component={CardKeyOnboardingScreen}
      />
      <AdminStack.Screen name="card-key-link" component={CardKeyLinkScreen} />
    </AdminStack.Navigator>
  );
};

export default AdminNavStack;

const styles = StyleSheet.create({});
