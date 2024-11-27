import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllItems } from "src/services/item/getAllItems";
import { getItemByCategory } from "src/services/item/getItemByCategory";
import { ItemDetails } from "src/services/item/types";

export const useGetItemList = () => {
  const [itemList, setItemList] = useState<ItemDetails[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const loadItemList = async (categoryName: string, nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    try {
      const { data: newItems } =
        categoryName === "ALL"
          ? await getAllItems(page)
          : await getItemByCategory(categoryName, nextPage);

      if (newItems.length < 10) {
        setEndReached(true);
      }

      setItemList((prev) => {
        const existingIds = new Set(prev.map((item) => item.uuid));
        const filteredItems = newItems.filter(
          (item) => !existingIds.has(item.uuid)
        );
        return [...prev, ...filteredItems];
      });
    } catch (err) {
      console.log("Error getting item list -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItemList("ALL", page);
  }, []);

  const resetState = () => {
    setPage(1);
    setItemList([]);
    setEndReached(false);
    setIsScrolling(false);
  };

  useEffect(() => resetState(), []);

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
  };
};
