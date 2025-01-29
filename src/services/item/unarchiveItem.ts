import wretch from "src/lib/wretch/wretch";
import { UnarchiveItemRes, UpdateItemLocationRes } from "./types";

export const unarchiveItem = async (itemId: number) => {
  const res = await wretch()
    .url(`/items/unarchive/${itemId}`)
    .patch()
    .json<UnarchiveItemRes>()
    .catch((err) => {
      console.log("Err unarchiving item => ", err);
      throw err;
    });
  return res.data;
};
