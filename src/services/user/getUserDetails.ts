import wretch from "src/lib/wretch/wretch";
import { GetUserDetailsRes } from "./types";

export const getUserDetails = async (identifier: string | number) => {
  const res = await wretch()
    .url(`/users/${identifier}`)
    .get()
    .json<GetUserDetailsRes>()
    .catch((err) => {
      console.log("Err getting user details => ", err);
      throw err;
    });
  return res.data;
};
