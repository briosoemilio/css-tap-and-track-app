import wretch from "src/lib/wretch/wretch";
import { Role } from "src/types/Role";
import { getItemDetails } from "../item/getItemDetails";
import { CreateReportRes } from "./types";

export const createReport = async (_reqBody: {
  itemName: string;
  remarks: string;
}) => {
  const { itemName, remarks } = _reqBody;
  const item = await getItemDetails(itemName);
  const reqbody = {
    itemId: item.id,
    remarks,
  };
  const res = await wretch()
    .url("/report")
    .post(reqbody)
    .json<CreateReportRes>()
    .catch((err) => {
      console.log("Err Creating Report => ", err);
      throw err;
    });
  return res.data;
};
