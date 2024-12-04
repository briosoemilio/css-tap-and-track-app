import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { getErrorMessage } from "src/services/helpers";

export const writeNfcTag = async (message: string, onSuccess?: () => void) => {
  let result = false;

  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);

    const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      console.log("6666666");
      result = true;

      await NfcManager.ndefHandler.makeReadOnly();
    }

    return result;
  } catch (error) {
    console.error("Failed to write NFC tag:", error);
    throw error;
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};
