import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllComputers } from "src/services/computer/getAllComputers";
import { ComputerDetails } from "src/services/computer/types";
import { getAllItems } from "src/services/item/getAllItems";
import { getItemByCategory } from "src/services/item/getItemByCategory";
import { ItemDetails } from "src/services/item/types";

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

export const useGetComputersList = () => {
  const [computersList, setComputersList] = useState<ComputerDetails[]>([]);
  const [originalList, setOriginalList] = useState<ComputerDetails[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [filters, setFilters] = useState<FilterOption[]>(INITIAL_FILTERS);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setComputersList(originalList);
  };

  const onPressFilter = (filter: FilterOption) => {
    setFilters((prevFilters) =>
      prevFilters.map((f) =>
        f.type === filter.type ? { ...f, name: filter.name } : f
      )
    );
  };

  const loadComputersList = async (nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    try {
      const { data: newItems } = await getAllComputers(nextPage);

      if (newItems.length < 10) {
        setEndReached(true);
      }

      setOriginalList((prev) => {
        const combined = [
          ...prev,
          ...newItems.filter((item) => !prev.some((i) => i.uuid === item.uuid)),
        ];
        setComputersList(combined);
        return combined;
      });
    } catch (err) {
      console.log("Error getting computers list -> ", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = originalList;

    const locationFilter = filters.find((f) => f.type === "location")?.name;
    if (locationFilter && locationFilter !== "ALL") {
      filtered = filtered.filter(
        (item) => item.locationName === locationFilter
      );
    }

    const statusFilter = filters.find((f) => f.type === "status")?.name;
    if (statusFilter && statusFilter !== "ALL") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setComputersList(filtered);
  }, [filters, originalList]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    resetState();
    loadComputersList(page);
  }, []);

  const resetState = () => {
    setPage(1);
    setComputersList([]);
    setOriginalList([]);
    setEndReached(false);
    setIsScrolling(false);
  };

  const loadMoreComputers = () => {
    if (!isLoading && !endReached) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    isLoading,
    computersList,
    endReached,
    isScrolling,
    setIsScrolling,
    loadComputersList,
    page,
    setPage,
    resetState,
    filters,
    resetFilters,
    onPressFilter,
    loadMoreComputers,
  };
};
