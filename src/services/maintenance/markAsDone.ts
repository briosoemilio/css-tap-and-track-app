import wretch from "src/lib/wretch/wretch";
import {  MarkAsDoneRes } from "./types";

export const markAsDone = async (id: number) => {
  const res = await wretch()
    .url(`/maintenance/mark-as-done/${id}`)
    .patch()
    .json<MarkAsDoneRes>()
    .catch((err) => {
      console.log("Err marking Maintenance as done => ", err);
      throw err;
    });
  return res.data;
};
