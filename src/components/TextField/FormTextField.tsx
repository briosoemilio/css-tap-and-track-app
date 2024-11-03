import { StyleProp, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import React from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import TextField from "./TextField";

export type ControlledInputProps<T> = TextInputProps & {
  label: string;
  name: string;
  control: Control<any, T>;
  placeholder?: string;
  rules?: ControllerProps["rules"];
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
const FormTextField = <T extends FieldValues>({
  label,
  name,
  rules,
  placeholder,
  control,
  editable = true,
  containerStyle,
  ...rest
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          containerStyle={containerStyle}
          error={error?.message}
          placeholder={placeholder}
          required={!!rules?.["required"]}
          value={field.value}
          onChangeText={field.onChange}
          editable={editable}
          {...rest}
        />
      )}
    />
  );
};

export default FormTextField;

const styles = StyleSheet.create({});
