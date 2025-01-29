import wretch from "src/lib/wretch/wretch";
import { GetItemRes } from "./types";

export const getItemDetails = async (identifier: number | string) => {
  const res = await wretch()
    .url(`/items/${identifier}`)
    .get()
    .json<GetItemRes>()
    .catch((err) => {
      console.log("Err getting item details => ", err);
      throw err;
    });
  return res.data;
};
