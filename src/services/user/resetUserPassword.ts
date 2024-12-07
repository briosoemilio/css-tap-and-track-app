import wretch from "src/lib/wretch/wretch";
import { ChangePasswordRes, ChangeSectionRes } from "./types";

export const resetUserPassword = async (reqBody: {
  email: string;
  newPassword: string;
}) => {
  const res = await wretch()
    .url(`/users/reset-password`)
    .patch(reqBody)
    .json<ChangePasswordRes>()
    .catch((err) => {
      console.log("Err reset user password => ", err);
      throw err;
    });
  return res.data;
};
