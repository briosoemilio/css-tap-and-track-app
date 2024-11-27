import React, { useEffect, useRef, useState } from "react";
import { getCategoryList } from "src/services/category/getCategoryList";
import { CategoryData } from "src/services/category/types";
import { parseCategoryData } from "../utils";
import { FlatList } from "react-native";

export const useGetCategoryList = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [selectedCategory, setCategory] = useState<string>("ALL");
  const categoryListRef = useRef<FlatList>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const categoryData = await getCategoryList();
      const parsedCategoryData = parseCategoryData(categoryData.data);
      setCategoryList(parsedCategoryData);
    } catch (e) {
      console.log("Error loading category data -> ", e);
    } finally {
      setLoading(false);
    }
  };

  const onPressCategory = (item: any, index: number) => {
    setCategory(item.name);
    categoryListRef.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    isLoading,
    categoryList,
    selectedCategory,
    onPressCategory,
    categoryListRef,
  };
};
