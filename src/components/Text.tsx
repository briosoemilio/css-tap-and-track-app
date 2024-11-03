import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextStyle,
  View,
  TextProps,
} from "react-native";
import React, { ReactNode } from "react";
import { COLORS } from "src/constants/colors";

export type TextComponentProps = TextProps & {
  variant?: FontVariantKeys;
  children: ReactNode;
  textAlign?: "auto" | "center" | "justify" | "left" | "right";
  style?: TextStyle | TextStyle[];
};

export type FontVariantKeys =
  | "header1"
  | "header2"
  | "header3"
  | "body1regular"
  | "body1bold"
  | "body2regular"
  | "body2bold"
  | "body3regular"
  | "body3bold";

const Text = (props: TextComponentProps) => {
  const {
    children,
    variant = "body1regular",
    textAlign = "left",
    style = {},
    ...rest
  } = props;

  return (
    <RNText
      style={[
        {
          ...styles[variant],
          ...styles.textWhite,
          textAlign,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  textWhite: { color: COLORS.white },
  header1: {
    fontFamily: "Instrument-Serif",
    fontSize: 20,
  },
  header2: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
  },
  header3: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
  },
  header4: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  body1regular: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
  },
  body1bold: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  body2regular: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  body2bold: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  body3regular: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  body3bold: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
  },
});
