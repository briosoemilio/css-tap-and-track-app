import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import Button from "src/components/Button";

const AlreadyAdminModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showModal, setShowModal } = props;

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent={true}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text variant="header3">Already an Admin Card</Text>
        </View>
        <View style={styles.modalContentContainer}>
          <Text textAlign="center">
            It seems that this card is already registered as an Admin.
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title={"Ok"}
              style={styles.flex1}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlreadyAdminModal;

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
  modalButtonContainer: { display: "flex", flexDirection: "row" },
  flex1: { flex: 1 },
});
