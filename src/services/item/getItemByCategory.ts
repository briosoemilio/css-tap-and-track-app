import wretch from "src/lib/wretch/wretch";
import { GetAllItemsRes } from "./types";

export const getItemByCategory = async (
  category: string,
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(
      `/items/category/${category}?page=${page}&itemsPerPage=${itemsPerPage}`
    )
    .get()
    .json<GetAllItemsRes>()
    .catch((err) => {
      console.log("Err Getting Items By Category List => ", err);
      throw err;
    });
  return res.data;
};
