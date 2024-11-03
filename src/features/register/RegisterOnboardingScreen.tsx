import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import Button from "src/components/Button";

import ProfAnimation from "@assets/animation/prof-animation.gif";
import StudentAnimation from "@assets/animation/student-animation.gif";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import { Role } from "src/types/Role";

const RegisterOnboardingScreen = () => {
  const [role, setRole] = useState<Role.STUDENT | Role.PROF>(Role.STUDENT);
  const [description, setDescription] = useState(
    "Can check and scan inventory details and input computer logs."
  );

  const navigation = useUnauthNavigation();

  const showAlert = () => {
    Alert.alert("Proceed", `Are you sure with your selected role?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => navigation.navigate("register", { role }) },
    ]);
  };

  const onPressStudent = () => {
    if (role === Role.STUDENT) return showAlert();
    setRole(Role.STUDENT);
    setDescription(
      "Can check and scan inventory details and input computer logs."
    );
  };

  const onPressProfessor = () => {
    if (role === Role.PROF) return showAlert();
    setRole(Role.PROF);
    setDescription(
      "Can check inventory list and status, and check all student computer logs."
    );
  };
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="header2" style={{ marginBottom: 12 }}>
          Sign Up
        </Text>
        <Text variant="body2regular" textAlign="left">
          {`First confirm if you are a student or a professor.`}
        </Text>

        <View style={{ display: "flex", alignItems: "center", padding: 20 }}>
          <Image
            source={role === Role.STUDENT ? StudentAnimation : ProfAnimation}
            style={{ width: 300, height: 300, marginBottom: 12 }}
          />
          <Text variant="body2regular">{description}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            title="Student"
            variant={role === Role.STUDENT ? "solid" : "outlined"}
            style={{ flex: 1, marginRight: 10 }}
            onPress={onPressStudent}
          />
          <Button
            title="Professor"
            variant={role === Role.PROF ? "solid" : "outlined"}
            style={{ flex: 1 }}
            onPress={onPressProfessor}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default RegisterOnboardingScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
});
