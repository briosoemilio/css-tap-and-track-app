import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import Button from "src/components/Button";

const CreateSuccessModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDismiss?: () => void;
}) => {
  const { showModal, setShowModal, onDismiss } = props;
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
      transparent={true}
      onDismiss={() => onDismiss?.()}
    >
      <View style={styles.modalMainContainer}>
        <Text variant="header3" textAlign="center">
          Peripheral Successfully Created!
        </Text>

        <View style={{ width: "100%" }}>
          <Button
            title="Done"
            onPress={() => {
              onDismiss?.();
              setShowModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateSuccessModal;

const styles = StyleSheet.create({
  modalMainContainer: {
    backgroundColor: COLORS.darkBlue,
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 250,
    borderRadius: 12,
    padding: 24,
  },
  modalHeaderContainer: {
    backgroundColor: COLORS.green,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
