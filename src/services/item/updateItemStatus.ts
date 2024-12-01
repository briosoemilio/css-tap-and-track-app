import wretch from "src/lib/wretch/wretch";
import { UpdateItemStatusRes } from "./types";

export const updateItemStatus = async (itemId: number, status: string) => {
  const res = await wretch()
    .url(`/items/status/${itemId}`)
    .patch({ status })
    .json<UpdateItemStatusRes>()
    .catch((err) => {
      console.log("Err Updating item Status => ", err);
      throw err;
    });
  return res.data;
};
