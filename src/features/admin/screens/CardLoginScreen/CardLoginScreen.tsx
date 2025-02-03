import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { useForm } from "react-hook-form";
import FormTextField from "src/components/TextField/FormTextField";
import Button from "src/components/Button";
import { adminLogin } from "src/services/login/adminLogin";
import { useAuth } from "src/context/auth/useAuth";
import { getErrorMessage } from "src/services/helpers";
import { getUserDetails } from "src/services/user/getUserDetails";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { login } from "src/services/login/login";

const CardLoginScreen = () => {
  const route = useRoute<RouteProp<UnauthNavParams, "card-login">>();
  const cardKey = route.params?.cardKey;

  const methods = useForm<{ password: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();

  const onSubmit = async (data: { password: string }) => {
    setIsLoading(true);
    try {
      const userDetails = await getUserDetails(cardKey);
      const loginRes = await login({
        email: userDetails?.email,
        password: data.password,
        cardKey,
      });
      onLogin(loginRes);
    } catch (err) {
      const errMessage = getErrorMessage(err);
      if (errMessage.includes("Wrong password")) {
        methods.setError("password", { message: "Incorrect password" });
      } else {
        methods.setError("password", { message: errMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="body2regular">
          It seems you have scanned a user key card.
        </Text>
        <Text variant="body2regular">
          Please enter your password to continue.
        </Text>
        <FormTextField
          control={methods.control}
          name="password"
          placeholder="Enter password"
          rules={{
            required: { value: true, message: "Password is required." },
          }}
          label="Password"
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={methods.handleSubmit(onSubmit)}
          isLoading={isLoading}
          style={{ marginTop: 50 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default CardLoginScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    gap: 15,
  },
});
