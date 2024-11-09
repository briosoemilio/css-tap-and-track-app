import wretch from "src/lib/wretch/wretch";
import { EndComputerLogRes } from "./types";

export const endComputerLog = async (identifier: string | number) => {
  const res = await wretch()
    .url(`/computer-logs/end-log/${identifier}`)
    .patch()
    .json<EndComputerLogRes>()
    .catch((err) => {
      console.log("Err ending computer log => ", err);
      throw err;
    });
  return res.data;
};
