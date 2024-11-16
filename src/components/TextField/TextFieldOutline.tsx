import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import Text from "../Text";
import { COLORS } from "src/constants/colors";

export type TextFieldOutlineProps = TextInputProps & {
  label: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle | TextStyle[];
  error?: string;
  left?: ReactNode;
  right?: ReactNode;
};

const TextFieldOutline = (props: TextFieldOutlineProps) => {
  const {
    label,
    containerStyle = {},
    labelStyle = {},
    error,
    left,
    right,
    ...rest
  } = props;
  return (
    <View style={containerStyle}>
      <Text variant="body2bold" style={{ ...labelStyle }}>
        {label}
      </Text>
      <View
        style={{
          backgroundColor: COLORS.transparent,
          padding: 12,
          borderRadius: 12,
          borderColor: COLORS.blue,
          borderWidth: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {left}
        <TextInput
          style={{ color: COLORS.white, flex: 1 }}
          placeholderTextColor={COLORS.lightGray}
          {...rest}
        />
        {right}
      </View>
      {error && (
        <Text variant="body3bold" style={{ color: COLORS.red, marginTop: 8 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextFieldOutline;

const styles = StyleSheet.create({});
