import { useEffect, useState } from "react";
import { getErrorMessage } from "src/services/helpers";
import { getReportList } from "src/services/report/getReportList";
import { ReportDetails } from "src/services/report/types";
import { parseAdminReportList } from "../../AdminReportsScreen/utils";
import { AdminReportCardInfo } from "../../AdminReportsScreen/components/AdminReportCard";

export const useUserReportsList = () => {
  const [userReports, setUserReports] = useState<ReportDetails[]>([]);
  const [parsedList, setParsedList] = useState<AdminReportCardInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);

  const loadReports = async (nextPage: number, userID?: number) => {
    setIsLoading(true);
    try {
      const { data: newReports } = await getReportList(nextPage, userID);

      if (newReports.length < 10) {
        setEndReached(true);
      }

      setUserReports((prev) => {
        const combined = [
          ...prev,
          ...newReports.filter(
            (user) => !prev.some((i) => i.uuid === user.uuid)
          ),
        ];
        return combined;
      });
    } catch (err) {
      const errMessage = getErrorMessage(err);
      console.log("Error loading reports -> ", errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setUserReports([]);
    setParsedList([]);
    setIsLoading(false);
    setEndReached(false);
    setPage(1);
  };

  useEffect(() => {
    loadReports(page);
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const parseList = async () => {
      const parsedList = await parseAdminReportList(userReports);
      setParsedList(parsedList);
    };
    parseList();
  }, [userReports]);

  return {
    userReports,
    parsedList,
    isLoading,
    endReached,
    loadMore,
    loadReports,
    resetState,
  };
};
