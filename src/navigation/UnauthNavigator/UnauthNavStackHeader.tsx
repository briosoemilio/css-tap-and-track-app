import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants/colors";
import CCSLogo from "@assets/png/ccs-logo.png";
import TextComponent from "src/components/Text";
import BackIcon from "@assets/icons/back-icon.svg";
import { useUnauthNavigation } from "./useUnauthNavigation";
import Text from "src/components/Text";

const UnauthNavStackHeader = (props: {
  canGoBack?: boolean;
  routeName: string;
}) => {
  const { canGoBack = false, routeName } = props;
  const navigation = useUnauthNavigation();

  const headerName = useMemo(() => {
    switch (routeName) {
      case "login": {
        return "Login";
      }
      case "register": {
        return "Sign Up";
      }
      case "track": {
        return "Track";
      }
      case "admin-login": {
        return "Admin Login";
      }
      case "otp": {
        return "OTP";
      }
      case "forgot-password": {
        return "Forgot Password";
      }
      case "reset-password": {
        return "Reset Password";
      }
    }
  }, [routeName]);

  return (
    <View>
      <View
        style={{
          backgroundColor: COLORS.black,
          paddingVertical: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.rowContainer}
        >
          {canGoBack && (
            <View style={styles.ml25}>
              <BackIcon />
            </View>
          )}
          {headerName && (
            <Text variant="header2" style={styles.ml25}>
              {headerName}
            </Text>
          )}
        </TouchableOpacity>

        {routeName === "onboarding" && (
          <View style={{ display: "flex", alignItems: "center" }}>
            <Image source={CCSLogo} style={styles.ccsLogo} />
            <TextComponent variant="headerInstrument2" textAlign="center">
              {`CCS: Tap and Track Computer \n Laboratory System`}
            </TextComponent>
          </View>
        )}
      </View>
    </View>
  );
};

export default UnauthNavStackHeader;

const styles = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ccsLogo: { width: 208, height: 160 },
  ml25: { marginLeft: 25 },
});
