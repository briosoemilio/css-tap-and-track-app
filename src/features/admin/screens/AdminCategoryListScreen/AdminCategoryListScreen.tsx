import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useGetCategoryList } from "../AdminInventoryListScreen/hooks/useGetCategoryList";
import CategoryCard from "./components/CategoryCard";
import AddCategoryBottomSheet from "./components/AddCategoryBottomSheet";

const AdminCategoryListScreen = () => {
  const { categoryList } = useGetCategoryList(false);
  const addCategoryBottomSheetRef = useRef<BottomSheet>(null);
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          style={styles.addLocation}
          onPress={() => addCategoryBottomSheetRef?.current?.expand()}
        >
          <Text variant="body2bold">Add Category</Text>
          <Text variant="body2bold">+</Text>
        </TouchableOpacity>
        <Text variant="body2regular">Categories:</Text>
        {categoryList.map((categoryDetails, index) => (
          <CategoryCard
            categoryDetails={categoryDetails}
            key={`location-${index}`}
          />
        ))}
      </ScrollView>
      <AddCategoryBottomSheet bottomSheetRef={addCategoryBottomSheetRef} />
    </ScreenContainer>
  );
};

export default AdminCategoryListScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
  addLocation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: COLORS.darkBlue,
  },
});
