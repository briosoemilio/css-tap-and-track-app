import AsyncStorage from "../storage/storage";
import { Session } from "./types";

export const getSession = async (): Promise<Session | {}> => {
  const session = await AsyncStorage.getItem<Session>("session");
  return session ?? {};
};
