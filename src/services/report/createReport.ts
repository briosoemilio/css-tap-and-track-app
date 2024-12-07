import wretch from "src/lib/wretch/wretch";
import { CreateReportRes } from "./types";

export const createReport = async (reqbody: {
  itemId: number;
  remarks: string;
}) => {
  const res = await wretch()
    .url("/report")
    .post(reqbody)
    .json<CreateReportRes>()
    .catch((err) => {
      console.log("Err Creating Report => ", err);
      throw err;
    });
  return res.data;
};
