import wretch from "src/lib/wretch/wretch";
import { GetComputerRes, GetComputerStatusRes } from "./types";

export const getComputerStatus = async (identifier: string | number) => {
  const res = await wretch()
    .url(`/computers/status/${identifier}`)
    .get()
    .json<GetComputerStatusRes>()
    .catch((err) => {
      console.log("Err getting computer status => ", err);
      throw err;
    });
  return res.data;
};
