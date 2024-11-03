import { Alert } from "react-native";

export const showUnderDevelopment = () => {
  Alert.alert("UNDER DEVELOPMENT", `Feature is still under develeopment.`, [
    {
      text: "Ok",
      style: "cancel",
    },
  ]);
};
