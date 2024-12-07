import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import { FormProvider, useForm } from "react-hook-form";
import Button from "src/components/Button";
import { RouteProp, useRoute } from "@react-navigation/native";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

const OtpScreen = () => {
  const navigation = useUnauthNavigation();
  const methods = useForm<{ otpEntered: string }>();
  const route = useRoute<RouteProp<UnauthNavParams, "otp">>();
  const otp = route?.params?.otp;
  const email = route?.params?.email;

  const onSubmit = (formData: { otpEntered: string }) => {
    const { otpEntered } = formData;
    try {
      if (otp !== otpEntered) {
        methods.setError("otpEntered", { message: "Incorrect OTP." });
        return;
      }
      navigation?.reset({
        index: 0,
        routes: [{ name: "reset-password", params: { email } }],
      });
    } catch (err) {
      console.log("Error submission of OTP -> ", err);
    } finally {
    }
  };

  return (
    <FormProvider {...methods}>
      <ScreenContainer>
        <View style={styles.mainContainer}>
          <View style={{ flex: 1 }}>
            <FormTextFieldOutline
              name="otpEntered"
              label="Enter OTP:"
              placeholder="Please enter OTP"
              control={methods.control}
              rules={{ required: "OTP is required." }}
            />
          </View>
          <Button title="Proceed" onPress={methods.handleSubmit(onSubmit)} />
        </View>
      </ScreenContainer>
    </FormProvider>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: CONSTANTS.layout,
    display: "flex",
    height: "95%",
  },
});
