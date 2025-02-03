import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import Text from "src/components/Text";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { COLORS } from "src/constants/colors";
import TrackBottomSheet from "src/components/TrackBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { checkIfAdminCard } from "src/features/track/utils";
import { addNewAdmin } from "src/services/login/addNewAdmin";
import Loader from "src/components/Loader";
import AlreadyLinkedModal from "./components/AlreadyLinkedModal";
import { useAuth } from "src/context/auth/useAuth";
import { isEmpty } from "lodash";
import { checkCardKey } from "src/services/user/checkCardKey";
import { writeCardKey } from "src/services/user/writeCardKey";

const LoadingComponent = () => {
  return (
    <View style={styles.iconTextContainer}>
      <View style={styles.textContainer}>
        <Text textAlign="center" variant="body2regular">
          Linking Card Please Wait
        </Text>
      </View>
      <Loader />
    </View>
  );
};

const MODAL_MESSAGE = {
  hasLinkedCard: "User already linked their card.",
  invalidCard:
    "Invalid card. This card is already linked to a different account.",
};

const CardKeyLinkScreen = () => {
  const { user } = useAuth();
  const navigation = useAuthNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const _showModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();

      // Check if user already linked card
      if (!isEmpty(user?.cardKey))
        return _showModal(MODAL_MESSAGE.hasLinkedCard);

      const { isCardKeyUsed } = await checkCardKey(tag?.id as string);
      if (isCardKeyUsed) {
        _showModal(MODAL_MESSAGE.invalidCard); // if cardkey already used, show modal
      } else {
        await _writeCardKey(tag); // proceed with write of card key
      }
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  const _writeCardKey = async (tag: any) => {
    bottomSheetRef?.current?.close();
    setIsLoading(true);
    try {
      if (tag.techTypes.includes("android.nfc.tech.MifareClassic")) {
        const res = await writeCardKey(tag.id);
        if (res) {
          navigation?.reset({
            index: 1,
            routes: [
              { name: "main" },
              {
                name: "success",
                params: { message: "Successfully linked your card key!" },
              },
            ],
          });
        }
      } else {
        setError("Invalid NFC Card. Please check.");
        return; // do nothing if not mifare card
      }
    } catch (err) {
      console.log("Error adding new admin -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <View style={styles.iconTextContainer}>
            <View style={styles.textContainer}>
              <Text textAlign="center" variant="body2regular">
                Place your phone over the Key Card
              </Text>
            </View>
            <NFCIcon />
          </View>
        )}
        {error && (
          <Text variant="body2bold" textAlign="center" style={styles.errorText}>
            {error}
          </Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Track Card"
          style={{ marginBottom: 12, backgroundColor: COLORS.red }}
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
          isLoading={isLoading}
        />
        <Button
          title="Back"
          onPress={() => navigation?.goBack()}
          disabled={isLoading}
        />
      </View>
      <TrackBottomSheet bottomSheetRef={bottomSheetRef} onOpen={readNdef} />
      <AlreadyLinkedModal
        message={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </ScreenContainer>
  );
};

export default CardKeyLinkScreen;

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
  errorText: { marginTop: 15, color: COLORS.red },
});
