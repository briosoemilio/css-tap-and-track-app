import wretch from "src/lib/wretch/wretch";
import { AddNewAdminRes, LoginRes } from "./types";

export const addNewAdmin = async (reqBody: { id: string }) => {
  const res = await wretch()
    .url("/auth/addAdmin")
    .post(reqBody)
    .json<AddNewAdminRes>()
    .catch((err) => {
      console.log("Err adding new admin => ", err);
      throw err;
    });
  return res.data.res;
};
