import NfcManager, { NfcTech } from "react-native-nfc-manager";

export const lockNfcTag = async (onSuccess?: () => void) => {
  try {
    await NfcManager.start();
    console.log("8888888");

    await NfcManager.requestTechnology(NfcTech.Ndef);
    console.log("9999999");

    await NfcManager.ndefHandler.makeReadOnly();
    console.log("10 10 10 10");

    onSuccess?.();
  } catch (error) {
    console.error("Error locking NFC tag:", error);
    throw error;
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};
