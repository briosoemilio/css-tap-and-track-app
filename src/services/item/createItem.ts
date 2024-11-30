import wretch from "src/lib/wretch/wretch";
import { CreateItemRes } from "./types";

export const createItem = async (reqBody: {
  name: string;
  metadata?: string;
  categoryName: string;
  locationName: string;
}) => {
  const res = await wretch()
    .url("/items")
    .post(reqBody)
    .json<CreateItemRes>()
    .catch((err) => {
      console.log("Err creating item => ", err);
      throw err;
    });
  return res.data;
};
