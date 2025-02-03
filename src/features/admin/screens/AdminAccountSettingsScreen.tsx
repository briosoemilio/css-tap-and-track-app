import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";
import { COLORS } from "src/constants/colors";
import { useAuth } from "src/context/auth/useAuth";

import AccountIconLarge from "@assets/icons/account/account-icon-large.svg";
import Text from "src/components/Text";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

const AdminAccounSettingsScreen = () => {
  const { user, onLogout } = useAuth();
  const navigation = useAdminNavigation();

  const onPressLogout = () => {
    Alert.alert("LOGOUT", `Are you sure you want to log out?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => onLogout(),
      },
    ]);
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.accountInfoContainer}>
          <Text variant="body2bold" style={styles.mb10}>
            ADMIN ACCOUNT
          </Text>
          <AccountIconLarge />
          <Text variant="body1bold">{user?.name}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Log-out"
          style={{ backgroundColor: COLORS.red }}
          onPress={onPressLogout}
        />
      </View>
    </ScreenContainer>
  );
};

export default AdminAccounSettingsScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout, marginBottom: 12 },
  accountInfoContainer: {
    marginTop: 100,
    display: "flex",
    alignItems: "center",
  },
  buttonContainers: {
    width: "100%",
    marginTop: 50,
    gap: 15,
  },
  changeSectionButton: { marginBottom: 24 },
  mb10: { marginBottom: 10 },
});
