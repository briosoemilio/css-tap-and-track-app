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
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

const AccountScreen = () => {
  const { user, onLogout } = useAuth();
  const navigation = useAuthNavigation();

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
          <AccountIconLarge />
          <Text variant="body1bold">{user?.name}</Text>
          {user?.yearSection && (
            <Text variant="body2regular">{user?.yearSection}</Text>
          )}
          <Text variant="body2regular">{user?.idNumber}</Text>
          <Text variant="body2regular">{user?.email}</Text>
        </View>
        <View style={styles.buttonContainers}>
          {/* <Button
            title="Change Section"
            onPress={() => navigation.navigate("change-section")}
            style={styles.changeSectionButton}
          /> */}
          <Button
            title="Link Card Key"
            onPress={() => navigation.navigate("card-key-link")}
            style={styles.linkCardKeyButton}
          />
          <Button
            title="Change Password"
            onPress={() => navigation?.navigate("change-password")}
          />
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

export default AccountScreen;

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
  },
  changeSectionButton: { marginBottom: 24 },
  linkCardKeyButton: { marginBottom: 24, backgroundColor: COLORS.green },
});
