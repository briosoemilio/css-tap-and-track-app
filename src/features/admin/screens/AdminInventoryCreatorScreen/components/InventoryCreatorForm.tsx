import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { useFormContext } from "react-hook-form";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import FormDropdown from "src/components/Dropdown/FormDropdown";
import { useLocationList } from "../../AdminInventoryListScreen/hooks/useLocationList";
import { parseCategoryList, parseLocationList } from "../utils";
import { useGetCategoryList } from "../../AdminInventoryListScreen/hooks/useGetCategoryList";

const InventoryCreatorForm = () => {
  const { control } = useFormContext();

  const { locationList } = useLocationList();
  const LOCATION_OPTIONS = parseLocationList(locationList);

  const { categoryList } = useGetCategoryList();
  const CATEGORY_OPTIONS = parseCategoryList(categoryList);
  return (
    <View style={{ gap: 12 }}>
      <FormTextFieldOutline
        label="Peripheral Name"
        name={"name"}
        placeholder="Enter peripheral name"
        rules={{ required: "Peripheral name is required." }}
        control={control}
      />
      <FormDropdown
        label="Location"
        name="locationName"
        rules={{ required: "Location name is required." }}
        placeholder="Select location"
        control={control}
        options={LOCATION_OPTIONS}
      />
      <FormDropdown
        label="Peripheral Category"
        name="categoryName"
        rules={{ required: "Peripheral Category is required." }}
        placeholder="Select category"
        control={control}
        options={CATEGORY_OPTIONS}
      />
    </View>
  );
};

export default InventoryCreatorForm;

const styles = StyleSheet.create({});
