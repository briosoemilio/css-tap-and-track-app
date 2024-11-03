import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";

import CameraIcon from "@assets/icons/camera-icon.svg";
import WifiIcon from "@assets/icons/wifi-icon.svg";
import NFCIcon from "@assets/icons/nfc-icon.svg";
import ChevronRight from "@assets/icons/chevron-right.svg";

import { COLORS } from "src/constants/colors";
import Button from "src/components/Button";

const PermissionButton = (props: {
  text: string;
  icon: "camera" | "wifi" | "nfc";
  onPress?: () => void;
}) => {
  const { text, icon, onPress } = props;
  let Icon = () => {
    switch (icon) {
      case "camera":
        return <CameraIcon />;
      case "wifi":
        return <WifiIcon />;
      case "nfc":
        return <NFCIcon />;
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.permissionContainer}>
      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <Icon />
        </View>
        <Text variant="body2regular">{text}</Text>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
};

const OnboardingScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="header2">Welcome</Text>
        <View style={{ marginTop: 24 }}>
          <Text variant="body2regular">
            Before we proceed please allow the permissions required to use the
            app
          </Text>
          <PermissionButton text={"Enable Camera"} icon={"camera"} />
          <PermissionButton text={"Enable Wifi"} icon={"wifi"} />
          <PermissionButton text={"Enable NFC"} icon={"nfc"} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Get Started" />
      </View>
    </ScreenContainer>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: 20 },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  iconContainer: {
    backgroundColor: COLORS.gray,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 24,
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  permissionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
});
