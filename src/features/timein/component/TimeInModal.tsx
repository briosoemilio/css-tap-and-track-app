import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import Button from "src/components/Button";

const TimeInModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onPressClose: () => void;
}) => {
  const { showModal, setShowModal, onPressClose } = props;
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
      transparent={true}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text variant="header3">Success</Text>
        </View>
        <View style={styles.modalContentContainer}>
          <Text>
            You have succesfully logged into this Computer. You have 3 hours to
            finish using this PC.
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title={"Okay"}
              style={styles.modalNotYetButton}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimeInModal;

const styles = StyleSheet.create({
  modalMainContainer: {
    backgroundColor: COLORS.darkBlue,
    width: "90%",
    display: "flex",
    alignItems: "center",
    height: 250,
    borderRadius: 12,
  },
  modalHeaderContainer: {
    backgroundColor: COLORS.green,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  modalTimeOutButton: {
    backgroundColor: COLORS.red,
    marginRight: 12,
    flex: 1,
  },
  modalNotYetButton: {
    flex: 1,
  },
  modalButtonContainer: { display: "flex", flexDirection: "row" },
});
