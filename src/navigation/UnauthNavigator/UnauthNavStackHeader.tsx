import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/colors";
import CCSLogo from "@assets/png/ccs-logo.png";
import TextComponent from "src/components/Text";
import BackIcon from "@assets/icons/back-icon.svg";
import { useUnauthNavigation } from "./useUnauthNavigation";

const UnauthNavStackHeader = (props: { canGoBack?: boolean }) => {
  const { canGoBack = false } = props;
  const navigation = useUnauthNavigation();
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
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ alignSelf: "flex-start", marginLeft: 25 }}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        <Image source={CCSLogo} style={{ width: 208, height: 160 }} />
        {!canGoBack && (
          <TextComponent variant="headerInstrument2" textAlign="center">
            {`CCS: Tap and Track Computer \n Laboratory System`}
          </TextComponent>
        )}
      </View>
    </View>
  );
};

export default UnauthNavStackHeader;

const styles = StyleSheet.create({});
