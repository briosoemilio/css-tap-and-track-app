import wretch from "src/lib/wretch/wretch";
import { ChangePasswordRes, ChangeSectionRes } from "./types";

export const changeUserPassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await wretch()
    .url(`/users/change-password`)
    .patch({ oldPassword, newPassword })
    .json<ChangePasswordRes>()
    .catch((err) => {
      console.log("Err changing user password => ", err);
      throw err;
    });
  return res.data;
};
