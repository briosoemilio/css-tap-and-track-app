import wretch from "src/lib/wretch/wretch";
import { GetReportListRes } from "./types";

export const getReportList = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/report/user-reports?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetReportListRes>()
    .catch((err) => {
      console.log("Err Getting Report List => ", err);
      throw err;
    });
  return res.data;
};
