import wretch from "src/lib/wretch/wretch";
import { CreateLocationRes } from "./types";

export const createLocation = async (name: string, floor: string) => {
  const res = await wretch()
    .url("/locations")
    .post({ name, floor })
    .json<CreateLocationRes>()
    .catch((err) => {
      console.log("Err Creating new location => ", err);
      throw err;
    });
  return res.data;
};
