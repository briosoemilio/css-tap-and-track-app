import wretch from "src/lib/wretch/wretch";
import { LoginRes } from "./types";

export const adminLogin = async (reqBody: { password: string }) => {
  const res = await wretch()
    .url("/auth/loginAdmin")
    .post(reqBody)
    .json<LoginRes>()
    .catch((err) => {
      console.log("Err admin log in => ", err);
      throw err;
    });
  return res.data;
};
