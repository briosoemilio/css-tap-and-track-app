import wretch from "src/lib/wretch/wretch";
import { ArchiveComputerRes } from "./types";

export const archiveComputer = async (computerId: number) => {
  const res = await wretch()
    .url(`/computers/archive/${computerId}`)
    .patch()
    .json<ArchiveComputerRes>()
    .catch((err) => {
      console.log("Err archiving computer => ", err);
      throw err;
    });
  return res.data;
};
