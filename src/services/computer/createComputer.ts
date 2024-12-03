import wretch from "src/lib/wretch/wretch";
import { CreateComputerRes } from "./types";

export const createComputer = async (reqBody: {
  name: string;
  metadata?: string;
  monitorName: string;
  keyboardName: string;
  mouseName: string;
  systemUnitName: string;
  locationName: string;
  others: string[];
}) => {
  const res = await wretch()
    .url("/computers")
    .post(reqBody)
    .json<CreateComputerRes>()
    .catch((err) => {
      console.log("Err creating item => ", err);
      throw err;
    });
  return res.data;
};
