import React, { useEffect, useMemo, useState } from "react";
import { getAllReportsList } from "src/services/report/getAllReportsList";
import { ReportDetails } from "src/services/report/types";
import { parseAdminReportList } from "../utils";
import { AdminReportCardInfo } from "../components/AdminReportCard";

export type FilterOption = {
  type: "location" | "status";
  name: string;
};

const INITIAL_FILTERS = [
  {
    type: "location",
    name: "ALL",
  },
  {
    type: "status",
    name: "ALL",
  },
] as FilterOption[];

export const useAdminReportList = () => {
  const [reportList, setReportList] = useState<ReportDetails[]>([]);
  const [parsedAdminReportList, setParsedList] = useState<
    AdminReportCardInfo[]
  >([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const loadReportList = async (nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    try {
      const res = await getAllReportsList(nextPage);
      const newItems = res.data;

      if (newItems.length < 10) {
        setEndReached(true);
      }

      setReportList((prev) => {
        const combined = [
          ...prev,
          ...newItems.filter((item) => !prev.some((i) => i.uuid === item.uuid)),
        ];
        return combined;
      });
    } catch (err) {
      console.log("Error getting item list -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    resetState();
    loadReportList(1);
  }, []);

  useEffect(() => {
    loadReportList(page);
  }, [page]);

  const resetState = () => {
    setPage(1);
    setReportList([]);
    setEndReached(false);
  };

  const loadMoreReports = () => {
    if (!isLoading && !endReached) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const parseList = async () => {
      const parsedList = await parseAdminReportList(reportList);
      setParsedList(parsedList);
    };
    parseList();
  }, [reportList]);

  return {
    isLoading,
    reportList,
    endReached,
    loadReportList,
    resetState,
    loadMoreReports,
    parsedAdminReportList,
  };
};
