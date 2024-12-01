import wretch from "src/lib/wretch/wretch";
import { GetReportListRes } from "./types";

export const getAllReportsList = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/report?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetReportListRes>()
    .catch((err) => {
      console.log("Err Getting ALL Reports List => ", err);
      throw err;
    });
  return res.data;
};
