import wretch from "src/lib/wretch/wretch";
import { GetComputerLogRes } from "./types";

export const getComputerLogDetails = async (identifier: string) => {
  const res = await wretch()
    .url(`/computer-logs/${identifier}`)
    .get()
    .json<GetComputerLogRes>()
    .catch((err) => {
      console.log("Err getting computer log details => ", err);
      throw err;
    });
  return res.data;
};
