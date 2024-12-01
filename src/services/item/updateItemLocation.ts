import wretch from "src/lib/wretch/wretch";
import { GetAllItemsRes, UpdateItemLocationRes } from "./types";

export const updateItemLocation = async (
  itemId: number,
  locationName: string
) => {
  const res = await wretch()
    .url(`/items/location/${itemId}`)
    .patch({ locationName })
    .json<UpdateItemLocationRes>()
    .catch((err) => {
      console.log("Err Updating item Location => ", err);
      throw err;
    });
  return res.data;
};
