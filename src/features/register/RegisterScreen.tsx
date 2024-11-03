import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import TextField from "src/components/TextField";
import Button from "src/components/Button";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

const RegisterScreen = () => {
  const navigation = useUnauthNavigation();

  return (
    <ScreenContainer>
      <ScrollView style={styles.mainContainer}>
        <Text variant="header2">Sign Up</Text>
        <TextField label="Email" containerStyle={styles.mtmb} />
        <TextField label="Password" containerStyle={styles.mb12} />
        <TextField label="Confirm Password" containerStyle={styles.mb12} />
        <TextField label="Full Name" containerStyle={styles.mb12} />
        <TextField label="Year and Section" containerStyle={styles.mb12} />
        <TextField label="ID Number" containerStyle={styles.mb12} />
        <Button
          title="SIGN UP"
          style={{ marginTop: 12, marginBottom: 24 }}
          onPress={() => navigation.push("register-success")}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  mtmb: { marginTop: 24, marginBottom: 12 },
  mb12: { marginBottom: 12 },
});
