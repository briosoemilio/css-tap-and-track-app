import { capitalize } from "lodash";
import { CategoryData } from "src/services/category/types";

export const parseCategoryData = (categoryData: CategoryData[]) => {
  const allCategories = {
    id: 0,
    name: "ALL",
  } as CategoryData;
  return [allCategories, ...categoryData];
};

export const parseCategoryName = (name: string) => {
  return capitalize(name.replace("_", " "));
};
