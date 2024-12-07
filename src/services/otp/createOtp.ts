import wretch from "src/lib/wretch/wretch";
import { CreateOtpRes } from "./types";

export const createOtp = async (reqBody: { email: string }) => {
  const res = await wretch()
    .url("/users/otp/forgot-password")
    .patch(reqBody)
    .json<CreateOtpRes>()
    .catch((err) => {
      console.log("Err Generating Otp => ", err);
      throw err;
    });
  return res.data;
};
