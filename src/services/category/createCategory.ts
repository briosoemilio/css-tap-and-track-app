import wretch from "src/lib/wretch/wretch";
import { CreateCategoryRes } from "./types";

export const createCategory = async (name: string) => {
  const res = await wretch()
    .url("/categories")
    .post({ name })
    .json<CreateCategoryRes>()
    .catch((err) => {
      console.log("Err Creating new category => ", err);
      throw err;
    });
  return res.data;
};
