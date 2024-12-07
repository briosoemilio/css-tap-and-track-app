import wretch from "src/lib/wretch/wretch";
import { GenerateReportRes, GetReportListRes } from "./types";

export const generateReportSummary = async (startDate: Date, endDate: Date) => {
  const res = await wretch()
    .url(`/report/report-summary?startDate=${startDate}&endDate=${endDate}`)
    .get()
    .json<GenerateReportRes>()
    .catch((err) => {
      console.log("Err Generating Report => ", err);
      throw err;
    });
  return res.data;
};
