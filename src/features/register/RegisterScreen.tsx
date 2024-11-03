import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import TextField from "src/components/TextField";
import Button from "src/components/Button";

const RegisterScreen = () => {
  return (
    <ScreenContainer>
      <Text variant="header2">Sign Up</Text>
      <TextField label="Email" containerStyle={styles.mtmb} />
      <TextField label="Password" containerStyle={styles.mb12} />
      <TextField label="Confirm Password" containerStyle={styles.mb12} />
      <TextField label="Full Name" containerStyle={styles.mb12} />
      <TextField label="Year and Section" containerStyle={styles.mb12} />
      <TextField label="ID Number" containerStyle={styles.mb12} />
      <Button title="SIGN UP" style={{ marginTop: 12, marginBottom: 24 }} />
    </ScreenContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mtmb: { marginTop: 24, marginBottom: 12 },
  mb12: { marginBottom: 12 },
});
