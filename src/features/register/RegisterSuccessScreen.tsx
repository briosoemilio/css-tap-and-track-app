import { Image, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import GreenCheck from "@assets/png/green-check.png";
import Button from "src/components/Button";

const RegisterSuccessScreen = () => {
  return (
    <ScreenContainer>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Image
          source={GreenCheck}
          style={{ width: 93, height: 85, marginVertical: 24 }}
        />
        <Text variant="header2">Congratulations!</Text>
        <View style={{ marginTop: 24 }}>
          <Text textAlign="center" style={{ marginBottom: 24 }}>
            You've successfully created an account. 🎉
          </Text>
          <Text textAlign="center">
            Thank you for joining our CCS community. Let's start exploring
            together!
          </Text>
        </View>
      </View>
      <Button title="Back to Log In" style={{ marginTop: 24 }} />
    </ScreenContainer>
  );
};

export default RegisterSuccessScreen;

const styles = StyleSheet.create({});
