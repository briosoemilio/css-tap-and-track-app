import { StyleSheet, View, Modal as RNModal } from "react-native";
import React, { ReactNode } from "react";

export type ModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  transparent: boolean;
  children: ReactNode;
};

const Modal = (props: ModalProps) => {
  const {
    visible,
    onRequestClose = () => null,
    transparent = true,
    children,
  } = props;

  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={transparent}
      animationType="fade"
    >
      <View style={styles.modalWrapper}>{children}</View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
