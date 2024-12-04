import wretch from "src/lib/wretch/wretch";
import { CheckAdminRes } from "./types";

export const checkAdmin = async (id: string) => {
  const res = await wretch()
    .url(`/auth/checkAdmin?id=${id}`)
    .get()
    .json<CheckAdminRes>()
    .catch((err) => {
      console.log("Err checking if admin => ", err);
      throw err;
    });
  return res.data;
};
