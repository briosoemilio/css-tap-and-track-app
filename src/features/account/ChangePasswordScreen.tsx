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

type ChangePasswordForm = {
  oldPassword: string;
  reenterOldPassword: string;
  newPassword: string;
};

const ChangePasswordScreen = () => {
  const navigation = useAuthNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<ChangePasswordForm>();

  const onPressSubmit = async (data: ChangePasswordForm) => {
    const { oldPassword, reenterOldPassword, newPassword } = data;

    if (oldPassword !== reenterOldPassword) {
      formMethods.setError("oldPassword", {
        message: "Password must be the same",
      });
      formMethods.setError("reenterOldPassword", {
        message: "Password must be the same",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await changeUserPassword(oldPassword, newPassword);
      if (res) {
        navigation.navigate("success", {
          message: "Successfully changed  password.",
        });
      }
    } catch (err) {
      const errMessage = getErrorMessage(err);
      console.log("Error submit change password -> ", err);
      if (errMessage.includes("Wrong password")) {
        formMethods.setError("oldPassword", { message: "Wrong password." });
        formMethods.setError("reenterOldPassword", {
          message: "Wrong password.",
        });
      } else {
        formMethods.setError("newPassword", {
          message: "An error occurred, please try again.",
        });
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
        <FormTextFieldOutline
          control={formMethods.control}
          label="Enter Password"
          name="oldPassword"
          rules={{ required: "Password is required." }}
          placeholder="Enter password"
        />
        <FormTextFieldOutline
          control={formMethods.control}
          label="Re-enter Password"
          name="reenterOldPassword"
          rules={{ required: "Password is required." }}
          placeholder="Enter password"
        />
        <FormTextFieldOutline
          control={formMethods.control}
          label="Enter New Password"
          name="newPassword"
          rules={{ required: "New password is required." }}
          placeholder="Enter new password"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            style={{ flex: 1, marginRight: 12 }}
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Submit"
            style={{ backgroundColor: COLORS.green, flex: 1 }}
            onPress={formMethods.handleSubmit(onPressSubmit)}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    display: "flex",
    width: "100%",
    gap: 15,
  },
  buttonContainer: {
    paddingHorizontal: CONSTANTS.layout,
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  accountInfoContainer: {
    marginTop: 100,
    display: "flex",
    alignItems: "center",
  },
  buttonContainers: {
    width: "100%",
    marginTop: 50,
  },
  changeSectionButton: { marginBottom: 24 },
});
