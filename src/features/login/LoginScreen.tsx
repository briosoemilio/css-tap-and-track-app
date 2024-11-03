import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Text from "src/components/Text";
import TextField from "src/components/TextField";
import Button from "src/components/Button";

const LoginScreen = () => {
  return (
    <ScreenContainer>
      <Text variant="header2">Login</Text>
      <TextField label="Email" containerStyle={{ marginTop: 12 }} />
      <TextField label="Password" containerStyle={{ marginTop: 12 }} />
      <Button title="Login" style={{ marginTop: 24 }} />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 36,
        }}
      >
        <Text variant="body2regular" style={{ marginBottom: 12 }}>
          Don't have account yet?
        </Text>
      </View>
      <Button title="Click here to sign up" variant="text" />
    </ScreenContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
