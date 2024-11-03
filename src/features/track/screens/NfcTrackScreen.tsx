import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import Text from "src/components/Text";
import { useTrackNavigation } from "../useTrackNavigation";

const NFCTrackScreen = () => {
  const navigation = useTrackNavigation();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.iconTextContainer}>
          <View style={styles.textContainer}>
            <Text textAlign="center" variant="body2regular">
              Place your phone over the NFC tag attached to the computer
              peripheral
            </Text>
          </View>
          <NFCIcon />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation?.goBack()} />
      </View>
    </ScreenContainer>
  );
};

export default NFCTrackScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: { width: 250, marginRight: 24 },
});
