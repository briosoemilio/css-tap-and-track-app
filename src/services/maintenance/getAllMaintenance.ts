import wretch from "src/lib/wretch/wretch";
import { GetAllMaintenanceRes } from "./types";

export const getAllMaintenance = async (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const res = await wretch()
    .url(`/maintenance?page=${page}&itemsPerPage=${itemsPerPage}`)
    .get()
    .json<GetAllMaintenanceRes>()
    .catch((err) => {
      console.log("Err Getting Maintenance List => ", err);
      throw err;
    });
  return res.data;
};
