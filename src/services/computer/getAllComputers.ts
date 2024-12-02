import wretch from "src/lib/wretch/wretch";
import { GetAllComputersRes } from "./types";

export const getAllComputers = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/computers?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetAllComputersRes>()
    .catch((err) => {
      console.log("Err Getting Computers List => ", err);
      throw err;
    });
  return res.data;
};
