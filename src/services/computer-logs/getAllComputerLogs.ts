import wretch from "src/lib/wretch/wretch";
import { GetAllComputerLogsRes } from "./types";

export const getAllComputerLogs = async (
  page: number = 1,
  itemsPerPage: number = 10,
  computerIdentifier: string | number = ""
) => {
  const res = await wretch()
    .url(
      `/computer-logs?page=${page}&itemsPerPage=${itemsPerPage}&computerIdentifier=${computerIdentifier}`
    )
    .get()
    .json<GetAllComputerLogsRes>()
    .catch((err) => {
      console.log("Err Getting Computers Logs List => ", err);
      throw err;
    });
  return res.data;
};
