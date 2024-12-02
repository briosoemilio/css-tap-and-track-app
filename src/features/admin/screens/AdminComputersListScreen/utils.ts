import { capitalize } from "lodash";

export const parseCategoryName = (name: string) => {
  return capitalize(name.replace("_", " "));
};
