import wretch from "src/lib/wretch/wretch";
import { ChangeSectionRes } from "./types";

export const changeUserSection = async (section: string) => {
  const res = await wretch()
    .url(`/users/change-section`)
    .patch({ section })
    .json<ChangeSectionRes>()
    .catch((err) => {
      console.log("Err changing user section => ", err);
      throw err;
    });
  return res.data;
};
