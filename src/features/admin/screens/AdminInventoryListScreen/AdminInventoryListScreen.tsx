import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

// components
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import Loader from "src/components/Loader";
import FilterIcon from "@assets/icons/inventory-list/filter-icon.svg";
import CategoryCard from "./components/CategoryCard";
import ItemCard from "./components/ItemCard";
import FilterBottomSheet from "./components/FilterBottomSheet";

// constants
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";

// hooks
import { useGetCategoryList } from "./hooks/useGetCategoryList";
import { useGetItemList } from "./hooks/useGetItemList";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";

const AdminInventoryListScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const { categoryList, selectedCategory, onPressCategory, categoryListRef } =
    useGetCategoryList();

  const {
    itemList,
    endReached,
    isLoading,
    page,
    setPage,
    loadItemList,
    resetState,
    filters,
    resetFilters,
    onPressFilter,
  } = useGetItemList();

  useEffect(() => {
    loadItemList(selectedCategory, page);
  }, [page, selectedCategory]);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text variant="body1bold">Inventory List</Text>
          <TouchableOpacity onPress={() => bottomSheetRef?.current?.expand()}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
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
            ListFooterComponent={() => {
              return (
                <ListFooter
                  showFooter={!endReached && itemList.length > 0 && !isLoading}
                  showLoader={isLoading}
                  onPress={() => {
                    setPage((prev) => prev + 1);
                  }}
                />
              );
            }}
            ListEmptyComponent={() => !isLoading && <ListEmpty />}
          />
        </View>
      </View>

      <FilterBottomSheet
        bottomSheetRef={bottomSheetRef}
        filters={filters}
        onPressFilter={onPressFilter}
        resetFilters={resetFilters}
      />
    </ScreenContainer>
  );
};

export default AdminInventoryListScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingHorizontal: CONSTANTS.layout },
  loadMore: {
    paddingVertical: 8,
    backgroundColor: COLORS.blue,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
