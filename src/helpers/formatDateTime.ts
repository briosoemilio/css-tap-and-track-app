import { format } from "date-fns";
import { isNil } from "lodash";

export const formatDateTime = (date: Date | string, formatString?: string) => {
  try {
    if (isNil(date)) return;
    const dateObject = new Date(date);

    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date value");
    }

    const defaultFormat = "MMM dd, yyyy HH:mm:ss";
    const formattedDate = format(dateObject, formatString || defaultFormat);
    return formattedDate;
  } catch (e) {
    console.log("Error formatting date -> ", e);
    return "Invalid Date";
  }
};
