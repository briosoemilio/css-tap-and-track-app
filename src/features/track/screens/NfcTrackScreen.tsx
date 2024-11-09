import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import Text from "src/components/Text";
import { useTrackNavigation } from "../useTrackNavigation";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { TagType, TrackType } from "../types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TrackNavParams } from "../TrackNavigator";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

const NFCTrackScreen = () => {
  const navigation = useTrackNavigation();
  const authNavigation = useAuthNavigation();
  const route = useRoute<RouteProp<TrackNavParams, "nfc">>();
  const { trackType } = route.params;
  console.log("Track type inside nfc track screen: ", trackType);
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag?.ndefMessage) {
        for (let record of tag.ndefMessage) {
          if (record?.tnf === Ndef.TNF_WELL_KNOWN) {
            // Decode the raw text payload from the NFC record
            const payload = record?.payload as unknown as Uint8Array;
            const text = JSON.parse(Ndef.text.decodePayload(payload));
            const json = JSON.parse(text);
            peripheralDetected(json);
            return;
          }
        }
      }
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const peripheralDetected = (json: { id: number; type: TagType }) => {
    const { id, type: tagType } = json;
    switch (trackType) {
      case TrackType.COMPUTER_LOG: {
        if (tagType === TagType.COMPUTER) {
          authNavigation.navigate("time-in", { computerId: id });
          break;
        }

        if (tagType === TagType.ITEM) {
          // show modal
          break;
        }
      }
      case TrackType.ITEM_DETAILS: {
        navigation.navigate("peripheral-details", { id, tagType });
        break;
      }
    }
  };

  useEffect(() => {
    console.log("123456");
    readNdef();
  });

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
        {/* <Button title="Test" onPress={(peripheralDetected)} /> */}
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
