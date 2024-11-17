import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormTextField from "src/components/TextField/FormTextField";
import Button from "src/components/Button";
import { register } from "src/services/register/register";
import { getErrorMessage } from "src/services/helpers";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

type RegisterStudentFormBody = {
  name: string;
  yearSection: string;
  idNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterStudentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, setError, getValues } =
    useForm<RegisterStudentFormBody>({
      mode: "onChange",
    });

  const navigation = useUnauthNavigation();

  const onPressSubmit = async (data: RegisterStudentFormBody) => {
    setIsLoading(true);
    try {
      const reqBody = {
        email: data.email,
        password: data.password,
        name: data.name,
        role: "STUDENT",
        yearSection: data.yearSection,
        idNumber: data.idNumber,
      };
      const res = await register(reqBody);
      if (res.uuid) return navigation?.navigate("register-success");
    } catch (err) {
      const errMessage = getErrorMessage(err);
      if (errMessage.includes("Email already used")) {
        setError("email", {
          message: "User with email already registered. Please check.",
        });
      }

      if (errMessage.includes("ID Number already used")) {
        setError("idNumber", {
          message: "User with ID Number already registered. Please check.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormTextField
        control={control}
        name="name"
        placeholder="Enter full name"
        rules={{
          required: { value: true, message: "Full Name is required." },
        }}
        label="Full Name"
        containerStyle={{ marginTop: 12, marginBottom: 12 }}
      />
      <FormTextField
        control={control}
        name="yearSection"
        placeholder="Enter year and section"
        rules={{
          required: { value: true, message: "Year and section is required." },
        }}
        label="Year and Section"
        containerStyle={{ marginBottom: 12 }}
      />
      <FormTextField
        control={control}
        name="idNumber"
        placeholder="Enter student number"
        rules={{
          required: { value: true, message: "Student Number is required." },
        }}
        label="Student Number"
        containerStyle={{ marginBottom: 12 }}
      />
      <FormTextField
        control={control}
        name="email"
        placeholder="Enter email address"
        rules={{
          required: { value: true, message: "Email is required." },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Enter a valid email address.",
          },
        }}
        label="Email"
        containerStyle={{ marginBottom: 12 }}
      />
      <FormTextField
        control={control}
        name="password"
        placeholder="Enter password"
        rules={{
          required: { value: true, message: "Password is required." },
        }}
        label="Password"
        containerStyle={{ marginBottom: 12 }}
        secureTextEntry
      />
      <FormTextField
        control={control}
        name="confirmPassword"
        placeholder="Enter password again"
        rules={{
          required: { value: true, message: "Confirm Password is required." },
          validate: (value) => {
            const password = getValues("password");
            return password === value || "Passwords do not match";
          },
        }}
        label="Confirm Password"
        containerStyle={{ marginBottom: 24 }}
        secureTextEntry
      />
      <Button
        title="Submit"
        onPress={handleSubmit(onPressSubmit)}
        isLoading={isLoading}
      />
    </>
  );
};

export default RegisterStudentForm;

const styles = StyleSheet.create({});
