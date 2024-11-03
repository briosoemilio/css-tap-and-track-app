import storage from "../storage/storage";

export const setSession = (session: {
  accessToken: string;
  refreshToken: string;
}) => {
  return storage.setItem("session", session);
};
