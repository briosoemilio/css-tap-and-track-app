import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Text from "src/components/Text";
import TextField from "src/components/TextField/TextField";
import Button from "src/components/Button";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import LoginForm from "./components/LoginForm";

const LoginScreen = () => {
  const navigation = useUnauthNavigation();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="header2">Login</Text>
        <LoginForm />
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
        <Button
          title="Click here to sign up"
          variant="text"
          onPress={() => navigation.push("register-onboarding")}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text variant="body2bold" style={{ marginBottom: 12 }}>
          For tracking peripherals, no account needed
        </Text>
        <Button title="Track Now" onPress={() => navigation.push("track")} />
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
});
