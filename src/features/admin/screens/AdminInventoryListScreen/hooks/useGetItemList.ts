import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
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

export const useGetItemList = () => {
  const [itemList, setItemList] = useState<ItemDetails[]>([]);
  const [originalList, setOriginalList] = useState<ItemDetails[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [filters, setFilters] = useState<FilterOption[]>(INITIAL_FILTERS);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setItemList(originalList);
  };

  const onPressFilter = (filter: FilterOption) => {
    setFilters((prevFilters) =>
      prevFilters.map((f) =>
        f.type === filter.type ? { ...f, name: filter.name } : f
      )
    );
  };

  const loadItemList = async (categoryName: string, nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    console.log({ categoryName });
    try {
      const { data: newItems } =
        categoryName === "ALL"
          ? await getAllItems(page)
          : await getItemByCategory(categoryName, nextPage);
      console.log({ newItems });

      if (newItems.length < 10) {
        setEndReached(true);
      }

      setOriginalList((prev) => {
        const combined = [
          ...prev,
          ...newItems.filter((item) => !prev.some((i) => i.uuid === item.uuid)),
        ];
        setItemList(combined); // Reflect filtered view
        return combined; // Keep unfiltered data intact
      });
    } catch (err) {
      console.log("Error getting item list -> ", err);
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

    setItemList(filtered);
  }, [filters, originalList]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    resetState();
    loadItemList("ALL", page);
  }, []);

  const resetState = () => {
    setPage(1);
    setItemList([]);
    setOriginalList([]);
    setEndReached(false);
    setIsScrolling(false);
  };

  const loadMoreItems = () => {
    if (!isLoading && !endReached) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    isLoading,
    itemList,
    endReached,
    isScrolling,
    setIsScrolling,
    loadItemList,
    page,
    setPage,
    resetState,
    filters,
    resetFilters,
    onPressFilter,
  };
};
