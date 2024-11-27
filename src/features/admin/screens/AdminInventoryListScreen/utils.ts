import { capitalize } from "lodash";
import { CategoryData } from "src/services/category/types";
import { ItemDetails } from "src/services/item/types";

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

export const parseItemList = async (itemData: ItemDetails[]) => {
  return itemData;
};
