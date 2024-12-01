import wretch from "src/lib/wretch/wretch";
import { GetReportListRes } from "./types";

export const getReportList = async (
  page: number = 1,
  userID?: number,
  itemsPerPage: number = 10
) => {
  const endpoint = userID
    ? `/report/user-reports?page=${page}&itemsPerPage=${itemsPerPage}&userID=${userID}`
    : `/report/user-reports?page=${page}&itemsPerPage=${itemsPerPage}`;

  const res = await wretch()
    .url(endpoint)
    .get()
    .json<GetReportListRes>()
    .catch((err) => {
      console.log("Err Getting Report List => ", err);
      throw err;
    });
  return res.data;
};
