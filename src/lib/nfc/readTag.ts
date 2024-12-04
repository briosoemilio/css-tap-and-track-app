import NfcManager, { NfcTech } from "react-native-nfc-manager";

export const readTag = async (technology = NfcTech.Ndef) => {
  try {
    await NfcManager.start();
    await NfcManager.requestTechnology(technology);
    const tag = await NfcManager.getTag();
    return tag;
  } catch (ex) {
    console.warn("Oops!", ex);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};
