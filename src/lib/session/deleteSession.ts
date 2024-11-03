import AsyncStorage from "../storage/storage";

export const deleteSession = () => {
  return AsyncStorage.removeItem("session");
};
