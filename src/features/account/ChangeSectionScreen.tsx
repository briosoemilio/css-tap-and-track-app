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

const ChangeSectionScreen = () => {
  const { user, updateUser } = useAuth();
  const navigation = useAuthNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<{ section: string }>();

  const onPressSubmit = async (data: { section: string }) => {
    const { section } = data;
    setIsLoading(true);
    try {
      const res = await changeUserSection(section);
      const { yearSection, ...rest } = user as UserModel;
      const newUser = { yearSection: section, ...rest };
      updateUser(newUser);
      navigation.navigate("success", {
        message: "Successfully changed user's section.",
      });
    } catch (err) {
      console.log("Error submit change section -> ", err);
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
          label="What section and year level are you now?"
          name="section"
          rules={{ required: "Please input new section." }}
          containerStyle={{ marginBottom: 24 }}
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

export default ChangeSectionScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
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
