import wretch from "src/lib/wretch/wretch";
import { GetCategoriesRes } from "./types";

export const getCategoryList = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/categories?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetCategoriesRes>()
    .catch((err) => {
      console.log("Err Get Category List => ", err);
      throw err;
    });
  return res.data;
};
