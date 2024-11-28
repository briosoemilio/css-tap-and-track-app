import wretch from "src/lib/wretch/wretch";
import { GetAllLocationsRes } from "./types";

export const getAllLocations = async () => {
  const res = await wretch()
    .url("/locations")
    .get()
    .json<GetAllLocationsRes>()
    .catch((err) => {
      console.log("Err Getting Locations List => ", err);
      throw err;
    });
  return res.data;
};
