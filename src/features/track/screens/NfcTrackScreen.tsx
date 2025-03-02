import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import Text from "src/components/Text";
import { useTrackNavigation } from "../useTrackNavigation";
import NfcManager, { NfcTech, Ndef, TagEvent } from "react-native-nfc-manager";
import { TagType, TrackType } from "../types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TrackNavParams } from "../TrackNavigator";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { COLORS } from "src/constants/colors";
import TrackBottomSheet from "src/components/TrackBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ItemModal from "../components/ItemModal";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";
import { useAuth } from "src/context/auth/useAuth";
import { checkCardKey } from "src/services/user/checkCardKey";

const NFCTrackScreen = () => {
  const navigation = useTrackNavigation();
  const authNavigation = useAuthNavigation();
  const unAuthNav = useUnauthNavigation();
  const route = useRoute<RouteProp<TrackNavParams, "nfc">>();
  const { user } = useAuth();
  const { trackType } = route.params;

  const [showModal, setShowModal] = useState(false);
  const [tagDetails, setTagDetails] = useState<{ id: number; type: TagType }>();

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const cardKeyHandler = async (tag: TagEvent | null) => {
    const isCardKeyUsed = await checkCardKey(tag?.id as string);
    if (isCardKeyUsed && !user) {
      unAuthNav?.reset({
        index: 1,
        routes: [
          { name: "login" },
          { name: "card-login", params: { cardKey: tag?.id } },
        ],
      });
    }
  };

  const peripheralHandler = async (tag: TagEvent | null) => {
    if (tag?.ndefMessage) {
      for (let record of tag.ndefMessage) {
        if (record?.tnf === Ndef.TNF_WELL_KNOWN) {
          const payload = record?.payload as unknown as Uint8Array;
          const text = JSON.parse(Ndef.text.decodePayload(payload));
          if (typeof text === "string") {
            const json = JSON.parse(text);
            peripheralDetected(json);
          } else {
            peripheralDetected(text);
          }
          return;
        }
      }
    }
  };

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();

      // Peripheral handler
      await peripheralHandler(tag);

      // Card Key Handler
      await cardKeyHandler(tag);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
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
          setTagDetails({ id, type: tagType });
          setShowModal(true);
          break;
        }
      }
      case TrackType.ITEM_DETAILS: {
        navigation.navigate("peripheral-details", { id, tagType });
        break;
      }
      case TrackType.CREATE_REPORT: {
        authNavigation.navigate("report", { id, tagType });
        break;
      }
    }
  };

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
        <Button
          title="Start Tracking"
          style={{ marginBottom: 12, backgroundColor: COLORS.red }}
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
        />
        <Button title="Back" onPress={() => navigation?.goBack()} />
      </View>
      <TrackBottomSheet bottomSheetRef={bottomSheetRef} onOpen={readNdef} />

      {/* Modals */}
      <ItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPressYes={() =>
          navigation.navigate("peripheral-details", {
            id: tagDetails?.id as number,
            tagType: tagDetails?.type as TagType,
          })
        }
      />
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
