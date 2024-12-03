import React, { useEffect, useState } from "react";
import { getAllComputerLogs } from "src/services/computer-logs/getAllComputerLogs";
import { ComputerLog } from "src/services/computer-logs/types";

export const useGetComputerLogsList = (computerIdentifier?: string) => {
  const [computerLogs, setComputerLogs] = useState<ComputerLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const loadComputerLogsList = async (nextPage: number) => {
    setIsLoading(true);
    try {
      const { data: newLogs } = await getAllComputerLogs(
        nextPage,
        10,
        computerIdentifier || ""
      );
      if (newLogs.length < 10) {
        setEndReached(true);
      }

      setComputerLogs((prev) => {
        const combined = [
          ...prev,
          ...newLogs.filter((log) => !prev.some((i) => i.uuid === log.uuid)),
        ];
        return combined;
      });
    } catch (err) {
      console.log("Error getting computer logs list -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComputerLogsList(page);
  }, [page]);

  useEffect(() => {
    loadComputerLogsList(1);
  }, []);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    computerLogs,
    isLoading,
    endReached,
    loadMore,
    loadComputerLogsList,
  };
};
