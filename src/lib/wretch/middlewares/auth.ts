import { Session } from "src/lib/session/types";
import AsyncStorage from "src/lib/storage/storage";
import { Middleware } from "wretch";

export const auth: Middleware = () => (next) => async (url, opts) => {
  const session = (await AsyncStorage.getItem("session")) as Session;
  const token = session?.token as string;

  opts.headers = {
    ...opts.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return next(url, opts);
};
