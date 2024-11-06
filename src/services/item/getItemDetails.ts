import wretch from "src/lib/wretch/wretch";
import { GetItemRes } from "./types";

export const getItemDetails = async (id: number) => {
  const res = await wretch()
    .url(`/items/${id}`)
    .get()
    .json<GetItemRes>()
    .catch((err) => {
      console.log("Err getting item details => ", err);
      throw err;
    });
  return res.data;
};
