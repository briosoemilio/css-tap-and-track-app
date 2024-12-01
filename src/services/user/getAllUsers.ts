import wretch from "src/lib/wretch/wretch";
import { GetAllUsersRes } from "./types";

export const getAllUsers = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/users?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetAllUsersRes>()
    .catch((err) => {
      console.log("Err Getting ALL Users => ", err);
      throw err;
    });
  return res.data;
};
