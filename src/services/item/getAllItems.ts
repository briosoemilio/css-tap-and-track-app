import wretch from "src/lib/wretch/wretch";
import { GetAllItemsRes } from "./types";

export const getAllItems = async (
  page: number = 1,
  itemsPerPage: number = 10,
  categoryName: string = "",
  locationName: string = "",
  status: string = ""
) => {
  const res = await wretch()
    .url(
      `/items?page=${page}&itemsPerPage=${itemsPerPage}&categoryName=${categoryName}&locationName=${locationName}&status=${status}`
    )
    .get()
    .json<GetAllItemsRes>()
    .catch((err) => {
      console.log("Err Getting Items List => ", err);
      throw err;
    });
  return res.data;
};
