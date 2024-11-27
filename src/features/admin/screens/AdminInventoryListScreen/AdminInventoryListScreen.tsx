import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { getCategoryList } from "src/services/category/getCategoryList";
import { CategoryData } from "src/services/category/types";
import { ItemDetails } from "src/services/item/types";
import { parseCategoryData, parseCategoryName } from "./utils";
import { capitalize } from "lodash";
import { COLORS } from "src/constants/colors";

const AdminInventoryListScreen = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [itemList, setItemList] = useState<ItemDetails[]>([]);
  const [selectedCategory, setCategory] = useState<string>("ALL");
  const flatListRef = useRef<FlatList>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const categoryData = await getCategoryList();
      const parsedCategoryData = parseCategoryData(categoryData.data);
      setCategoryList(parsedCategoryData);
    } catch (e) {
      console.log("Error loading data -> ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <Text variant="body1bold">Inventory List</Text>
        <View style={{ marginTop: 12 }}>
          <FlatList
            ref={flatListRef}
            data={categoryList}
            renderItem={({ item, index }) => (
              <CategoryCard
                name={item.name}
                isSelected={item.name === selectedCategory}
                onPress={() => {
                  setCategory(item.name);
                  flatListRef.current?.scrollToIndex({
                    animated: true,
                    index,
                    viewPosition: 0.5,
                  });
                }}
              />
            )}
            horizontal
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const CategoryCard = (props: {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const { name, isSelected, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.categoryCard, isSelected && styles.selectedCategory]}
    >
      <Text variant="body2regular">{parseCategoryName(name)}</Text>
    </TouchableOpacity>
  );
};

export default AdminInventoryListScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  categoryCard: {
    paddingHorizontal: 18,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginRight: 12,
    borderRadius: 12,
  },
  selectedCategory: { backgroundColor: COLORS.darkBlue },
});
