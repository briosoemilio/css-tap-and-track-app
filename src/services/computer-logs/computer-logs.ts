import wretch from "src/lib/wretch/wretch";
import { CreateComputerLogRes } from "./types";

type CreateComputerLogsBody = {};

export const computerLogs = async (reqBody: CreateComputerLogsBody) => {
  const res = await wretch()
    .url("/computer-logs")
    .post(reqBody)
    .json<CreateComputerLogRes>()
    .catch((err) => {
      console.log("Err creatign computer log => ", err);
      throw err;
    });
  return res;
};
