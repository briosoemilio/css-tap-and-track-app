import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Button from "src/components/Button";

import NFCIcon from "@assets/icons/nfc-track-icon.svg";
import Text from "src/components/Text";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { COLORS } from "src/constants/colors";
import TrackBottomSheet from "src/components/TrackBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useAuth } from "src/context/auth/useAuth";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { checkIfAdminCard } from "src/features/track/utils";
import { addNewAdmin } from "src/services/login/addNewAdmin";
import Loader from "src/components/Loader";
import WriteSuccessModal from "./components/WriteSuccessModal";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import { writeNfcTag } from "src/lib/nfc/writeTag";
import { lockNfcTag } from "src/lib/nfc/lockTag";
import { readTag } from "src/lib/nfc/readTag";

const LoadingComponent = () => {
  return (
    <View style={styles.iconTextContainer}>
      <View style={styles.textContainer}>
        <Text textAlign="center" variant="body2regular">
          Writing tag please wait. Do not remove tag while writing.
        </Text>
      </View>
      <Loader />
    </View>
  );
};

const AdminWriteTagScreen = () => {
  const route = useRoute<RouteProp<AdminNavParams, "write-tag">>();
  const { tagType: type, id } = route.params;

  const navigation = useAdminNavigation();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const navToSuccessScreen = () => {
    navigation?.reset({
      index: 1,
      routes: [
        { name: "main" },
        { name: "success", params: { message: "Succesfully written" } },
      ],
    });
  };

  const writeTag = async () => {
    setIsLoading(true);
    try {
      // write tag
      const tagData = {
        type: type,
        id: id,
      };
      const message = JSON.stringify(tagData);
      const res = await writeNfcTag(message);
      if (res) {
        navToSuccessScreen();
      }
    } catch (err) {
      console.log("Error writing tag  -> ", err);
      setError("Invalid NFC Tag. Please check.");
      bottomSheetRef?.current?.close();
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
                Place your phone over the unwritten NFC Tag.
              </Text>
            </View>
            <NFCIcon />
          </View>
        )}
        {error && (
          <View>
            <Text
              variant="body2bold"
              textAlign="center"
              style={styles.errorText}
            >
              {error}
            </Text>
            <View style={{ marginTop: 24 }}>
              <Text variant="body2regular" textAlign="center">
                Possible reasons why the tag wasn't accepted:
              </Text>
              <Text variant="body2regular" textAlign="center">
                {`1.) Tag is read only. (Not Writable)`}
              </Text>
              <Text variant="body2regular" textAlign="center">
                {`2.) Tag type is unsupported.`}
              </Text>
              <Text
                variant="body2regular"
                textAlign="center"
                style={{ marginTop: 24 }}
              >
                Please use a different tag.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Scan Tag"
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
      <TrackBottomSheet bottomSheetRef={bottomSheetRef} onOpen={writeTag} />
      <WriteSuccessModal showModal={showModal} setShowModal={setShowModal} />
    </ScreenContainer>
  );
};

export default AdminWriteTagScreen;

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
