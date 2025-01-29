import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllItems } from "src/services/item/getAllItems";
import { getItemByCategory } from "src/services/item/getItemByCategory";
import { ItemDetails } from "src/services/item/types";
import { getAllMaintenance } from "src/services/maintenance/getAllMaintenance";
import { MaintenanceDetails } from "src/services/maintenance/types";

export const useGetComputerMaintenance = () => {
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceDetails[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const loadMaintenanceList = async (nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    try {
      const { data } = await getAllMaintenance(nextPage);
      if (data.length < 10) {
        setEndReached(true);
      }
      setMaintenanceList(data);
    } catch (err) {
      console.log("Error getting maintenance list -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMaintenanceList(1);
  }, []);

  useEffect(() => {
    loadMaintenanceList(page);
  }, [page]);

  const resetState = () => {
    setPage(1);
    setMaintenanceList([]);
    setEndReached(false);
    setIsScrolling(false);
  };

  const loadMoreItems = () => {
    setPage((prev) => prev + 1);
  };

  return {
    maintenanceList,
    isLoading,
    endReached,
    isScrolling,
    setIsScrolling,
    page,
    setPage,
    resetState,
    loadMoreItems,
  };
};
