import { StyleSheet, TextStyle, View } from "react-native";
import React from "react";
import Modal from "src/components/Modal";
import { COLORS } from "src/constants/colors";
import Text, { FontVariantKeys } from "src/components/Text";
import Button from "src/components/Button";
import { formatDate } from "src/helpers/formatDate";

const ErrorModal = (props: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeOut: () => Promise<void>;
  computerName: string;
  lastLog: string;
}) => {
  const { showModal, setShowModal, timeOut, computerName, lastLog } = props;

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      transparent={true}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text variant="header3">User Already Logged</Text>
        </View>
        <View style={styles.modalContentContainer}>
          <Text textAlign="center">
            It seems that you are already using a different device.
          </Text>
          <AttributeRow
            variant={"body1regular"}
            attributeName={"PC Name "}
            value={computerName as string}
          />
          <AttributeRow
            variant={"body1regular"}
            attributeName={"Used at "}
            value={formatDate(lastLog) as string}
          />

          <Text
            variant="body1bold"
            textAlign="center"
            style={{ marginTop: 12 }}
          >
            Do you want to log out of this pc first?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title={"Time Out"}
              style={styles.modalTimeOutButton}
              onPress={() => timeOut()}
            />
            <Button
              title={"No"}
              style={styles.modalNotYetButton}
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const AttributeRow = (props: {
  variant: FontVariantKeys;
  attributeName: string;
  value: string;
  valueStyle?: TextStyle;
}) => {
  const { variant, attributeName, value, valueStyle } = props;
  return (
    <View style={styles.flexRow}>
      <Text variant={variant} style={styles.flex1}>
        {attributeName}:
      </Text>
      <Text variant={variant} style={[styles.flex1, valueStyle]}>
        {value}
      </Text>
    </View>
  );
};

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
    backgroundColor: COLORS.red,
    marginRight: 12,
    flex: 1,
  },
  modalNotYetButton: {
    flex: 1,
  },
  modalButtonContainer: { display: "flex", flexDirection: "row" },
  flexRow: { flexDirection: "row", marginBottom: -24 },
  flex1: { flex: 1 },
});
