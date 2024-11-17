import { formatDate } from "src/helpers/formatDate";
import { ComputerDetails } from "src/services/computer/types";
import { getItemDetails } from "src/services/item/getItemDetails";
import { ReportDetails } from "src/services/report/types";
import { ReportCardInfo } from "./ReportListScreen";

export const getComputerPeripherals = (computerDetails: ComputerDetails) => {
  const { monitorName, keyboardName, mouseName, systemUnitName, others } =
    computerDetails as ComputerDetails;
  const components = [
    monitorName,
    keyboardName,
    mouseName,
    systemUnitName,
    ...others,
  ];

  return components.map((component, index) => {
    return {
      id: index,
      label: component,
      value: component,
    };
  });
};

export const parseReportList = async (_reportList: ReportDetails[]) => {
  const parsedReportList = await Promise.all(
    _reportList.map(async (reportDetails) => {
      const { itemId, createdAt, remarks } = reportDetails;
      const itemDetails = await getItemDetails(itemId);
      const { name, categoryName } = itemDetails;
      return {
        name,
        categoryName,
        date: formatDate(createdAt, "MM/dd/yyyy"),
        remarks,
      } as ReportCardInfo;
    })
  );

  return parsedReportList;
};
