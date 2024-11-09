import wretch from "src/lib/wretch/wretch";
import { GetComputerRes } from "./types";
import { getComputerStatus } from "./getComputerStatus";

export const getComputerDetails = async (identifier: string | number) => {
  const res = await wretch()
    .url(`/computers/${identifier}`)
    .get()
    .json<GetComputerRes>()
    .catch((err) => {
      console.log("Err getting computer details => ", err);
      throw err;
    });
  const computerStatus = await getComputerStatus(identifier);
  const data = {
    ...res.data,
    category: "Computer",
    status: computerStatus.computerStatus,
  };
  return data;
};
