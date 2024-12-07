import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import { FormProvider, useForm } from "react-hook-form";
import Button from "src/components/Button";
import { createOtp } from "src/services/otp/createOtp";
import { RouteProp, useRoute } from "@react-navigation/native";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { CONSTANTS } from "src/constants/constants";
import { getUserDetails } from "src/services/user/getUserDetails";
import { getErrorMessage } from "src/services/helpers";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

const ForgotPasswordScreen = () => {
  const methods = useForm<{ email: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useUnauthNavigation();

  const onSubmit = async (formData: { email: string }) => {
    const { email } = formData;

    try {
      setIsLoading(true);

      const { otp } = await createOtp({ email });
      if (otp) {
        navigation?.navigate("otp", { email, otp });
      }
    } catch (err) {
      const errMessage = getErrorMessage(err);
      if (errMessage.includes("not found")) {
        methods.setError("email", { message: "Email not yet registered." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ScreenContainer>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text variant="body2bold">Forgot your password?</Text>
            <Text variant="body2regular">
              Please enter your email address below.
            </Text>
            <Text variant="body2regular">
              We will send an OTP to entered email address to reset your
              password.
            </Text>
            <FormTextFieldOutline
              name="email"
              label="Email Address"
              placeholder="Please enter email address"
              control={methods.control}
              rules={{ required: "Email is required." }}
            />
          </View>
          <Button
            title="Send OTP"
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={{ marginTop: 24 }}
          />
        </View>
      </ScreenContainer>
    </FormProvider>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: CONSTANTS.layout,
    display: "flex",
    height: "95%",
  },
  contentContainer: {
    gap: 15,
    flexGrow: 1,
  },
});
