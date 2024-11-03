import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import GreenCheck from "@assets/png/green-check.png";
import Button from "src/components/Button";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

const RegisterSuccessScreen = () => {
  const navigation = useUnauthNavigation();

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Back to Log In"
          style={{ marginTop: 24 }}
          onPress={() => navigation.push("login")}
        />
      </View>
    </ScreenContainer>
  );
};

export default RegisterSuccessScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
});
