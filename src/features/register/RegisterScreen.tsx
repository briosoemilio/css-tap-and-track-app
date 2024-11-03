import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import TextField from "src/components/TextField/TextField";
import Button from "src/components/Button";
import { CONSTANTS } from "src/constants/constants";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { Role } from "src/types/Role";
import RegisterStudentForm from "./components/RegisterStudentForm";
import RegisterProfessorForm from "./components/RegisterProfessorForm";

const RegisterScreen = () => {
  const route = useRoute<RouteProp<UnauthNavParams, "register">>();
  const { role } = route.params;
  const navigation = useUnauthNavigation();

  return (
    <ScreenContainer>
      <ScrollView style={styles.mainContainer}>
        <Text variant="header2">Sign Up</Text>
        {role === Role.STUDENT && <RegisterStudentForm />}
        {role === Role.PROF && <RegisterProfessorForm />}
      </ScrollView>
    </ScreenContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  mtmb: { marginTop: 24, marginBottom: 12 },
  mb12: { marginBottom: 12 },
});
