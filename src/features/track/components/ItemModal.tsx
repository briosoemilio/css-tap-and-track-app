import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import Button from "src/components/Button";

const ItemModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onPressYes: () => void;
}) => {
  const { showModal, setShowModal, onPressYes } = props;

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent={true}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text variant="header3">Item NFC Tag</Text>
        </View>
        <View style={styles.modalContentContainer}>
          <Text textAlign="center">
            The tag that you have scanned is an Item NFC Tag. If you want to
            time-in please scan a Computer NFC Tag.
          </Text>

          <Text
            variant="body1bold"
            textAlign="center"
            style={{ marginTop: 12 }}
          >
            Do you want to see the Item's details instead?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title={"Yes"}
              style={styles.modalTimeOutButton}
              onPress={() => onPressYes()}
            />
            <Button
              title={"Close"}
              style={styles.modalNotYetButton}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  modalMainContainer: {
    backgroundColor: COLORS.darkBlue,
    width: "90%",
    display: "flex",
    alignItems: "center",
    height: 400,
    borderRadius: 12,
  },
  modalHeaderContainer: {
    backgroundColor: COLORS.red,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
  },
  modalTimeOutButton: {
    marginRight: 12,
    flex: 1,
  },
  modalNotYetButton: {
    backgroundColor: COLORS.red,
    flex: 1,
  },
  modalButtonContainer: { display: "flex", flexDirection: "row" },
  flexRow: { flexDirection: "row", marginBottom: -24 },
  flex1: { flex: 1 },
});
