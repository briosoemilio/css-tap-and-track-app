import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { COLORS } from "../constants/colors";

const ScreenContainer = (props: { children: ReactNode }) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>{props.children}</ScrollView>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({});
