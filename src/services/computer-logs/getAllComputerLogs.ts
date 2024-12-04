import wretch from "src/lib/wretch/wretch";
import { GetAllComputerLogsRes } from "./types";

export const getAllComputerLogs = async (
  page: number = 1,
  itemsPerPage: number = 10,
  computerIdentifier: string | number = "",
  userIdentifier: string | number = ""
) => {
  // Build the base URL
  let url = `/computer-logs?page=${page}&itemsPerPage=${itemsPerPage}`;

  // Conditionally append query parameters if they are truthy
  if (computerIdentifier) {
    url += `&computerIdentifier=${encodeURIComponent(computerIdentifier)}`;
  }

  if (userIdentifier) {
    url += `&userIdentifier=${encodeURIComponent(userIdentifier)}`;
  }
  
  const res = await wretch()
    .url(url)
    .get()
    .json<GetAllComputerLogsRes>()
    .catch((err) => {
      console.log("Err Getting Computers Logs List => ", err);
      throw err;
    });
  return res.data;
};
