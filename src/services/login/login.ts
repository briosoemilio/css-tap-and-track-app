import wretch from "src/lib/wretch/wretch";
import { LoginRes } from "./types";

export const login = async (reqBody: { email: string; password: string }) => {
  const res = await wretch()
    .url("/auth/login")
    .post(reqBody)
    .json<LoginRes>()
    .catch((err) => {
      console.log("Err logging in => ", err);
      throw err;
    });
  return res.data;
};
