import wretch from "src/lib/wretch/wretch";
import { Role } from "src/types/Role";
import { RegisterRes } from "./types";

export const register = async (reqBody: {
  email: string;
  password: string;
  name: string;
  role: string;
  yearSection?: string;
  idNumber: string;
}) => {
  const res = await wretch()
    .url("/users/register")
    .post(reqBody)
    .json<RegisterRes>()
    .catch((err) => {
      console.log("Err register user => ", err);
      throw err;
    });
  return res.data;
};
