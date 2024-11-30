import { capitalize } from "lodash";
import { DropdownOption } from "src/components/Dropdown/types";
import { CategoryData } from "src/services/category/types";
import { LocationDetails } from "src/services/location/types";
import { parseCategoryName } from "../AdminInventoryListScreen/utils";
import { PeripheralAttributes } from "./components/MetadataForm";

export const parseLocationList = (data: LocationDetails[]) => {
  const locationOptions = data
    .filter((location) => location.name !== "ALL")
    .map((location, index) => {
      return {
        id: index,
        label: capitalize(location.name),
        value: location.name,
      } as DropdownOption;
    });
  return locationOptions;
};

export const parseCategoryList = (data: CategoryData[]) => {
  const categoryOptions = data
    .filter((category) => category.name !== "ALL")
    .map((category, index) => {
      return {
        id: index,
        label: parseCategoryName(category.name),
        value: category.name,
      };
    });
  return categoryOptions;
};

export const parseMetadata = (attributes: PeripheralAttributes[]): string => {
  const obj: Record<string, string> = attributes.reduce<Record<string, string>>(
    (acc, { attribute, value }) => {
      acc[attribute] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return JSON.stringify(obj, null, 2); // Pretty-print with 2 spaces
};
