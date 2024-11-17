import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import TextFieldOutline, { TextFieldOutlineProps } from "./TextFieldOutline";

export type ControlledInputProps<T> = TextFieldOutlineProps & {
  label: string;
  name: string;
  control: Control<any, T>;
  placeholder?: string;
  rules?: ControllerProps["rules"];
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const FormTextFieldOutline = <T extends FieldValues>({
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
        <TextFieldOutline
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

export default FormTextFieldOutline;

const styles = StyleSheet.create({});
