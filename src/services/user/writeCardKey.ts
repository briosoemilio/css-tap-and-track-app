import wretch from "src/lib/wretch/wretch";
import { WriteCardKeyRes } from "./types";

export const writeCardKey = async (cardKey: string) => {
  const res = await wretch()
    .url("/users/write-card-key")
    .patch({ cardKey })
    .json<WriteCardKeyRes>()
    .catch((err) => {
      console.log("Err writing card key => ", err);
      throw err;
    });
  return res.data;
};
