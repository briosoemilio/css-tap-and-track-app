import {
  StyleSheet,
  Button as RNButton,
  ButtonProps,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "src/constants/colors";
import Text from "./Text";

type ButtonComponentProps = TouchableWithoutFeedbackProps & {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  variant?: "solid" | "text" | "outlined";
  isLoading?: boolean;
};

const Button = (props: ButtonComponentProps) => {
  const {
    title,
    onPress = () => null,
    style = {},
    disabled = false,
    variant = "solid",
    isLoading = false,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "solid"
          ? styles.buttonSolid
          : variant === "outlined"
          ? styles.buttonOutlined
          : styles.buttonText,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text
        variant="body2bold"
        style={variant === "text" ? styles.textBlue : {}}
      >
        {`${title}    `}
        {isLoading && <ActivityIndicator color={COLORS.white} />}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSolid: {
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    backgroundColor: COLORS.transparent,
  },
  textBlue: {
    color: COLORS.blue,
    textDecorationLine: "underline",
  },
  buttonOutlined: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.blue,
    borderWidth: 5,
  },
});
