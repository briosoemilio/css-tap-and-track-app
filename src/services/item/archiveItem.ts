import wretch from "src/lib/wretch/wretch";
import { ArchiveItemRes, UpdateItemLocationRes } from "./types";

export const archiveItem = async (itemId: number) => {
  const res = await wretch()
    .url(`/items/archive/${itemId}`)
    .patch()
    .json<ArchiveItemRes>()
    .catch((err) => {
      console.log("Err archiving item => ", err);
      throw err;
    });
  return res.data;
};
