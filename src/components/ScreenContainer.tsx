import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { COLORS } from "../constants/colors";

const ScreenContainer = (props: { children: ReactNode }) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <View style={{ padding: 16 }}>{props.children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({});
