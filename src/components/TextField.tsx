import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";

export type TextFieldProps = TextInputProps & {
  label: string;
  required?: boolean;
  containerStyle: StyleProp<ViewStyle>;
  labelStyle?: TextStyle | TextStyle[];
};

const TextField = (props: TextFieldProps) => {
  const { label, containerStyle, labelStyle = {}, ...rest } = props;
  return (
    <View style={containerStyle}>
      <Text variant="body1regular" style={{ marginBottom: 12, ...labelStyle }}>
        {label}
      </Text>
      <TextInput
        style={{ backgroundColor: COLORS.white, padding: 12, borderRadius: 12 }}
        {...rest}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({});
