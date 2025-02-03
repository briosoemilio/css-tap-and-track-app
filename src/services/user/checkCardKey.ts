import wretch from "src/lib/wretch/wretch";
import { CardKeyCheckRes } from "./types";

export const checkCardKey = async (cardKey: string) => {
  const res = await wretch()
    .url(`/users/card-key-check/${cardKey}`)
    .get()
    .json<CardKeyCheckRes>()
    .catch((err) => {
      console.log("Err checking card key => ", err);
      throw err;
    });
  console.log("check card key: ", res);
  return res.data;
};
