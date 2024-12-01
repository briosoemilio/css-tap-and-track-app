import { getItemDetails } from "src/services/item/getItemDetails";
import { ReportDetails } from "src/services/report/types";
import { getUserDetails } from "src/services/user/getUserDetails";
import { AdminReportCardInfo } from "./components/AdminReportCard";

export const parseAdminReportList = async (_reportList: ReportDetails[]) => {
  const parsedReportList = await Promise.all(
    _reportList.map(async (reportDetails) => {
      const { reportedBy, itemId, createdAt, remarks } = reportDetails;

      // get item details
      const itemDetails = await getItemDetails(itemId);
      const { name: itemName, locationName } = itemDetails;

      // get user details
      const userDetails = await getUserDetails(reportedBy);
      const { name: userName } = userDetails;
      return {
        itemName,
        locationName,
        userName,
        remarks,
        reportDetails,
      } as AdminReportCardInfo;
    })
  );

  return parsedReportList;
};
