import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "src/constants/colors";

const Loader = (props: {
  size?: "small" | "large" | number;
  color?: string;
}) => {
  const { size = "small", color = COLORS.white } = props;
  return <ActivityIndicator size={size} color={color} />;
};

export default Loader;

const styles = StyleSheet.create({});
