import { format } from "date-fns";
import { isNil } from "lodash";

export const formatDate = (date: Date | string, formatString?: string) => {
  try {
    if (isNil(date)) return;
    const dateString = new Date(date).toDateString();
    const formattedDate = format(dateString, formatString || "MMM dd, yyyy");
    return formattedDate;
  } catch (e) {
    console.log("Error format date -> ", e);
    return "Invalid Date";
  }
};
