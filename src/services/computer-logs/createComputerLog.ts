import wretch from "src/lib/wretch/wretch";
import { CreateComputerLogRes, EndComputerLogRes } from "./types";

export const createComputerLog = async (identifier: string | number) => {
  const res = await wretch()
    .url(`/computer-logs/${identifier}`)
    .post()
    .json<CreateComputerLogRes>()
    .catch((err) => {
      console.log("Err creating computer log => ", err);
      throw err;
    });
  return res.data;
};
