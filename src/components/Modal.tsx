import { StyleSheet, Text, View, Modal as RNModal } from "react-native";
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
      animationType="slide"
    >
      {children}
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({});
