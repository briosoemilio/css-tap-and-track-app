import {
  StyleSheet,
  Button as RNButton,
  ButtonProps,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
  View,
  TextStyle,
} from "react-native";
import React, { useMemo } from "react";
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

  const customStyle = useMemo(() => {
    let _style: {
      buttonStyle: StyleProp<ViewStyle>;
      textStyle: TextStyle;
    };

    switch (variant) {
      case "outlined":
        {
          if (disabled) {
            _style = {
              buttonStyle: styles.buttonOutlinedDisabled,
              textStyle: styles.textOutlinedDisabled,
            };
          } else {
            _style = {
              buttonStyle: styles.buttonOutlined,
              textStyle: styles.textOutlined,
            };
          }
        }
        break;
      case "solid":
        {
          if (disabled) {
            _style = {
              buttonStyle: styles.buttonSolidDisabled,
              textStyle: styles.textSolidDisabled,
            };
          } else {
            _style = {
              buttonStyle: styles.buttonSolid,
              textStyle: styles.textSolid,
            };
          }
        }
        break;
      case "text":
        {
          if (disabled) {
            _style = {
              buttonStyle: styles.buttonTextDisabled,
              textStyle: styles.textTextDisabled,
            };
          } else {
            _style = {
              buttonStyle: styles.buttonText,
              textStyle: styles.textText,
            };
          }
        }
        break;
    }
    return _style;
  }, [disabled, variant]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, customStyle.buttonStyle]}
      disabled={disabled}
      {...rest}
    >
      <Text variant="body2bold" style={customStyle.textStyle}>
        {title}
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
  // SOLID
  buttonSolid: {
    backgroundColor: COLORS.blue,
  },
  buttonSolidDisabled: {
    backgroundColor: COLORS.gray,
  },
  textSolid: {
    color: COLORS.white,
  },
  textSolidDisabled: {
    color: COLORS.black,
  },

  // TEXT
  buttonText: {
    backgroundColor: COLORS.transparent,
  },
  buttonTextDisabled: {
    backgroundColor: COLORS.transparent,
  },
  textText: {
    color: COLORS.blue,
    textDecorationLine: "underline",
  },
  textTextDisabled: {
    color: COLORS.gray,
    textDecorationLine: "underline",
  },

  // OUTLINED
  buttonOutlined: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.blue,
    borderWidth: 5,
  },
  buttonOutlinedDisabled: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.gray,
    borderWidth: 5,
  },
  textOutlined: {
    color: COLORS.white,
  },
  textOutlinedDisabled: {
    color: COLORS.gray,
  },
});
