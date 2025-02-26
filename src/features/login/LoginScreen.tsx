import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "../../components/ScreenContainer";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import LoginForm, { LoginFormBody } from "./components/LoginForm";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAuth } from "src/context/auth/useAuth";
import { getErrorMessage } from "src/services/helpers";
import { login } from "src/services/login/login";
import { TrackType } from "../track/types";
import { Role } from "src/types/Role";
import ArchivedAccountModal from "./components/ArchivedAccountModal";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useUnauthNavigation();
  const { onLogin } = useAuth();
  const methods = useForm<LoginFormBody>({
    mode: "onChange",
  });
  const { setError, handleSubmit } = methods;

  const onSubmit = async (data: LoginFormBody) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      onLogin(res);
    } catch (err) {
      const errMessage = getErrorMessage(err);
      if (errMessage.includes("email not found")) {
        setError?.("email", { message: "Email is not yet registered." });
      }

      if (errMessage.includes("Wrong password")) {
        setError("password", { message: "Incorrect password" });
      }

      if (errMessage.includes("Account unauthorized")) {
        setError("email", { message: "Unauthorized account." });
      }

      if (errMessage.includes("User archived")) {
        setShowModal(true);
        setError("email", { message: "Archived account." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ScreenContainer>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ flexGrow: 1 }}>
            <LoginForm />
            <View style={styles.trackNowContainer}>
              <Text variant="body2regular" style={{ marginBottom: -12 }}>
                For tracking peripherals, no account needed
              </Text>
              <Button
                title="Track Now"
                variant="text"
                onPress={() =>
                  navigation.push("track", {
                    trackType: TrackType.ITEM_DETAILS,
                  })
                }
              />
            </View>
            <Button
              title="Login"
              style={{ marginTop: 12 }}
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
          <View style={styles.footerContainer}>
            {/* <Button
              title="Create an account"
              variant="text"
              onPress={() =>
                navigation.push("register", { role: Role.STUDENT })
              }
            /> */}
            <Button
              title="Forgot password?"
              variant="text"
              onPress={() => navigation?.navigate("forgot-password")}
            />
          </View>
        </ScrollView>
      </ScreenContainer>
      <ArchivedAccountModal showModal={showModal} setShowModal={setShowModal} />
    </FormProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
  },
  contentContainer: {
    display: "flex",
    height: "95%",
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  trackNowContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 36,
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
