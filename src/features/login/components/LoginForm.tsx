import { StyleSheet } from "react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormTextField from "src/components/TextField/FormTextField";

export type LoginFormBody = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { control } = useFormContext();

  return (
    <>
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
        containerStyle={{ marginTop: 12 }}
      />
      <FormTextField
        control={control}
        name="password"
        placeholder="Enter password"
        rules={{
          required: { value: true, message: "Password is required." },
        }}
        label="Password"
        containerStyle={{ marginTop: 12 }}
        secureTextEntry
      />
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
