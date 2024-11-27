import React, { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

// components
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import Loader from "src/components/Loader";
import EmptyInventoryLottie from "@assets/animation/empty-inventory-lottie.json";

// constants
import { ItemDetails } from "src/services/item/types";
import { parseCategoryName } from "./utils";
import { COLORS } from "src/constants/colors";
import { ItemStatus } from "src/types/ItemStatus";

// hooks
import { useGetCategoryList } from "./hooks/useGetCategoryList";
import { useGetItemList } from "./hooks/useGetItemList";

const AdminInventoryListScreen = () => {
  const { categoryList, selectedCategory, onPressCategory, categoryListRef } =
    useGetCategoryList();

  const {
    itemList,
    endReached,
    isScrolling,
    isLoading,
    page,
    setPage,
    setIsScrolling,
    loadItemList,
    resetState,
  } = useGetItemList();

  useEffect(() => {
    loadItemList(selectedCategory, page);
  }, [page, selectedCategory]);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <Text variant="body1bold">Inventory List</Text>
        <View style={{ marginTop: 12 }}>
          <FlatList
            ref={categoryListRef}
            data={categoryList}
            renderItem={({ item, index }) => (
              <CategoryCard
                name={item.name}
                isSelected={item.name === selectedCategory}
                onPress={() => {
                  resetState();
                  onPressCategory(item, index);
                }}
              />
            )}
            horizontal
          />
        </View>
        <View style={{ marginTop: 12, flex: 1 }}>
          <FlatList
            data={itemList}
            renderItem={({ item }) => <ItemCard itemDetails={item} />}
            keyExtractor={(_, index) => `key-${index}`}
            onEndReached={() => {
              if (endReached || isScrolling === false) return;
              setPage((prev) => prev + 1);
            }}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => setIsScrolling(true)}
            ListFooterComponent={() => isLoading && <Loader size={"large"} />}
            ListEmptyComponent={() =>
              !isLoading && (
                <View>
                  <LottieView
                    source={EmptyInventoryLottie}
                    style={{ height: 300, width: 300 }}
                    autoPlay
                    loop
                  />
                  <Text variant="header3" textAlign="center">
                    Sorry this category has no items
                  </Text>
                </View>
              )
            }
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

const ItemCard = (props: { itemDetails: ItemDetails }) => {
  const { itemDetails } = props;
  const { name, locationName, categoryName, status } = itemDetails;
  return (
    <TouchableOpacity style={styles.itemCard}>
      <View>
        <Text variant="body2bold">{name}</Text>
        <Text variant="body3regular">{locationName}</Text>
      </View>
      <View>
        <Text variant="body3regular" textAlign="right">
          {categoryName}
        </Text>
        <Text
          variant="body3regular"
          textAlign="right"
          style={
            status === ItemStatus.UNDER_MAINTENANCE
              ? { color: COLORS.red }
              : { color: COLORS.green }
          }
        >
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminInventoryListScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingHorizontal: CONSTANTS.layout },
  categoryCard: {
    paddingHorizontal: 18,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginRight: 12,
    borderRadius: 12,
  },
  selectedCategory: { backgroundColor: COLORS.darkBlue },
  itemCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginBottom: 12,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
