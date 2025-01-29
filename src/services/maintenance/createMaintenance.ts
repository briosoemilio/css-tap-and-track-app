import wretch from "src/lib/wretch/wretch";
import { CreateMaintenanceRes } from "./types";

export const createMaintenance = async (reqBody: {
  computerId: number;
  scheduleDate: Date;
}) => {
  const res = await wretch()
    .url("/maintenance")
    .post(reqBody)
    .json<CreateMaintenanceRes>()
    .catch((err) => {
      console.log("Err creating maintenance => ", err);
      throw err;
    });
  return res.data;
};
