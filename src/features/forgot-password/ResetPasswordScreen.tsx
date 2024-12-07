import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";
import { COLORS } from "src/constants/colors";
import { useAuth } from "src/context/auth/useAuth";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

import { changeUserSection } from "src/services/user/changeUserSection";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import { useForm } from "react-hook-form";
import { UserModel } from "src/types/UserModel";
import { changeUserPassword } from "src/services/user/changeUserPassword";
import { getErrorMessage } from "src/services/helpers";
import { RouteProp, useRoute } from "@react-navigation/native";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { resetUserPassword } from "src/services/user/resetUserPassword";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

type ResetPasswordForm = {
  newPassword: string;
  reenterNewPassword: string;
};

const ResetPasswordScreen = () => {
  const navigation = useUnauthNavigation();
  const route = useRoute<RouteProp<UnauthNavParams, "reset-password">>();
  const email = route?.params?.email;

  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<ResetPasswordForm>();

  const onPressSubmit = async (data: ResetPasswordForm) => {
    // checking if same password was entered
    const { newPassword, reenterNewPassword } = data;
    if (newPassword !== reenterNewPassword) {
      formMethods.setError("newPassword", {
        message: "Password must be the same",
      });
      formMethods.setError("reenterNewPassword", {
        message: "Password must be the same",
      });
      return;
    }

    try {
      // call API
      setIsLoading(true);
      const res = await resetUserPassword({ email, newPassword });
      if (res) {
        navigation?.reset({
          index: 1,
          routes: [
            { name: "login" },
            {
              name: "success",
              params: { message: "Reset password success." },
            },
          ],
        });
      }
    } catch (err) {
      const errMessage = getErrorMessage(err);
      console.log("Error submit change password -> ", errMessage);
      formMethods.setError("newPassword", {
        message: "An error occurred, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View style={{ flex: 1, gap: 15 }}>
          <FormTextFieldOutline
            control={formMethods.control}
            label="Enter New Password"
            name="newPassword"
            rules={{ required: "Password is required." }}
            placeholder="Enter password"
            secureTextEntry
          />
          <FormTextFieldOutline
            control={formMethods.control}
            label="Re-enter Password"
            name="reenterNewPassword"
            rules={{ required: "Password is required." }}
            placeholder="Enter password"
            secureTextEntry
          />
        </View>
        <Button
          title="Submit"
          onPress={formMethods.handleSubmit(onPressSubmit)}
          isLoading={isLoading}
          style={{ marginTop: 15 }}
        />
      </View>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: CONSTANTS.layout,
    display: "flex",
    height: "95%",
  },
});
