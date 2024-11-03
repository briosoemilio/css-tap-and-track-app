import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTrackNavigation } from "../useTrackNavigation";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import QRIcon from "@assets/icons/qr-icon.svg";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";

const TrackMethodCard = (props: { type: "nfc" | "qr" }) => {
  const { type } = props;
  const content = () => {
    switch (type) {
      case "nfc":
        return { icon: <NFCIcon />, text: "NFC" };
      case "qr":
        return { icon: <QRIcon />, text: "QR Code" };
    }
  };
  const navigation = useTrackNavigation();
  return (
    <TouchableOpacity
      style={styles.trackMethod}
      onPress={() => navigation.push(type)}
    >
      <View style={styles.trackIcon}>{content().icon}</View>
      <Text variant="body1regular">{content().text}</Text>
    </TouchableOpacity>
  );
};

const ChooseTrackScreen = () => {
  const navigation = useTrackNavigation();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="body1regular" style={styles.headerText}>
          Choose tracking method
        </Text>
        <TrackMethodCard type="nfc" />
        <TrackMethodCard type="qr" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};

export default ChooseTrackScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  trackMethod: {
    padding: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.blue,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 24,
  },
  trackIcon: {
    width: 50,
    display: "flex",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: { marginBottom: 36 },
});
