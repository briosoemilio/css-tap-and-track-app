import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "src/components/Text";
import { Controller, useForm } from "react-hook-form";
import TextField from "src/components/TextField/TextField";
import FormTextField from "src/components/TextField/FormTextField";
import Button from "src/components/Button";
import { login } from "src/services/login/login";
import { getErrorMessage } from "src/services/helpers";
import { useAuth } from "src/context/auth/useAuth";

type LoginFormBody = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setError } = useForm<LoginFormBody>({
    mode: "onChange",
  });

  const { onLogin } = useAuth();

  const onSubmit = async (data: LoginFormBody) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      await onLogin(res);
    } catch (err) {
      const errMessage = getErrorMessage(err);
      if (errMessage.includes("email not found")) {
        setError("email", { message: "Email is not yet registered." });
      }

      if (errMessage.includes("Wrong password")) {
        setError("password", { message: "Incorrect password" });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <Button
        title="Login"
        style={{ marginTop: 24 }}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
