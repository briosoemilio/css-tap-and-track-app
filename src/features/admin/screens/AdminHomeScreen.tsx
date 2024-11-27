import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import { TrackType } from "src/features/track/types";
import InventoryIcon from "@assets/icons/admin-home/inventory-icon.svg";
import AccountSettingsIcon from "@assets/icons/admin-home/account-settings-icon.svg";
import MaintenanceIcon from "@assets/icons/admin-home/maintenance-icon.svg";
import PeripheralsCategoryIcon from "@assets/icons/admin-home/peripherals-category-icon.svg";
import ReportsIcon from "@assets/icons/admin-home/reports-icon.svg";
import TrackIcon from "@assets/icons/admin-home/track-icon.svg";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";

export type HomeIconTypes =
  | "inventory"
  | "reports"
  | "track"
  | "maintenance"
  | "account-settings"
  | "peripheral";

const HomeIcon = (props: { type: HomeIconTypes }) => {
  const navigation = useAdminNavigation();
  const { type } = props;

  const icon = () => {
    switch (type) {
      case "inventory":
        return {
          icon: <InventoryIcon />,
          text: "Inventory",
          onPress: () => navigation.navigate("inventory"),
        };
      case "reports":
        return {
          icon: <ReportsIcon />,
          text: "Reports",
          onPress: () => showUnderDevelopment(),
        };
      case "track":
        return {
          icon: <TrackIcon />,
          text: "Track Here",
          onPress: () =>
            navigation.navigate("track", { trackType: TrackType.ITEM_DETAILS }),
        };
      case "maintenance":
        return {
          icon: <MaintenanceIcon />,
          text: "Maintenance",
          onPress: () => showUnderDevelopment(),
        };
      case "account-settings":
        return {
          icon: <AccountSettingsIcon />,
          text: "Account Settings",
          onPress: () => navigation.navigate("account"),
        };
      case "peripheral":
        return {
          icon: <PeripheralsCategoryIcon />,
          text: "Peripheral Category",
          onPress: () => showUnderDevelopment(),
        };
    }
  };

  return (
    <TouchableOpacity onPress={() => icon().onPress()} style={styles.homeIcon}>
      {icon().icon}
      <Text
        variant="body2bold"
        style={{ marginTop: 12 }}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {icon().text}
      </Text>
    </TouchableOpacity>
  );
};

const AdminHomeScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text variant="body1bold" style={styles.helloText}>
            Hello this is admin home screen
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <HomeIcon type="inventory" />
          <HomeIcon type="reports" />
          <HomeIcon type="track" />
          <HomeIcon type="maintenance" />
          <HomeIcon type="account-settings" />
          <HomeIcon type="peripheral" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: "space-evenly",
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  homeIcon: {
    backgroundColor: COLORS.teal,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  helloText: { marginBottom: 36 },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 24,
    paddingHorizontal: 36,
  },
});
