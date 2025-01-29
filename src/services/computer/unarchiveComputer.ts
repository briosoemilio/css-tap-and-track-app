import wretch from "src/lib/wretch/wretch";
import { UnarchiveComputerRes } from "./types";

export const unarchiveComputer = async (computerId: number) => {
  const res = await wretch()
    .url(`/computers/unarchive/${computerId}`)
    .patch()
    .json<UnarchiveComputerRes>()
    .catch((err) => {
      console.log("Err unarchiving computer => ", err);
      throw err;
    });
  return res.data;
};
