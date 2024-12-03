import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import Button from "src/components/Button";

const ConfirmResetModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDismiss?: () => void;
  onPressOk: () => void;
}) => {
  const { showModal, setShowModal, onDismiss, onPressOk } = props;
  const CHANGE_LOCATION_TEXT =
    "Changing location will reset the entire form, are you sure you want to change?";
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
          Oops!
        </Text>
        <Text variant="body2regular" textAlign="center">
          {CHANGE_LOCATION_TEXT}
        </Text>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="Yes"
            onPress={() => {
              onPressOk();
              setShowModal(false);
            }}
            style={{ flexGrow: 1, marginRight: 12 }}
          />
          <Button
            title="No"
            onPress={() => {
              onDismiss?.();
              setShowModal(false);
            }}
            style={{ flexGrow: 1, backgroundColor: COLORS.red }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmResetModal;

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
