import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/colors";
import CCSLogo from "@assets/png/ccs-logo.png";
import TextComponent from "src/components/Text";

const UnauthNavStackHeader = () => {
  return (
    <View>
      <StatusBar />
      <View
        style={{
          height: 250,
          backgroundColor: COLORS.black,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image source={CCSLogo} style={{ width: 208, height: 160 }} />
        <TextComponent variant="header1" textAlign="center">
          {`CCS: Tap and Track Computer \n Laboratory System`}
        </TextComponent>
      </View>
    </View>
  );
};

export default UnauthNavStackHeader;

const styles = StyleSheet.create({});
