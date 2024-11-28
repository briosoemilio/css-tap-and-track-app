import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

// components
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import FilterIcon from "@assets/icons/inventory-list/filter-icon.svg";
import CategoryCard from "./components/CategoryCard";
import ItemCard from "./components/ItemCard";
import FilterBottomSheet from "./components/FilterBottomSheet";
import CloseIcon from "@assets/icons/close-icon.svg";
import AddIcon from "@assets/icons/inventory-list/add-icon.svg";

// constants
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";

// hooks
import { useGetCategoryList } from "./hooks/useGetCategoryList";
import { useGetItemList } from "./hooks/useGetItemList";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { parseCategoryName } from "./utils";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

const AdminInventoryListScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useAdminNavigation();

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
  const locationFilter = filters?.find((filter) => filter.type === "location");
  const statusFilter = filters?.find((filter) => filter.type === "status");

  useEffect(() => {
    loadItemList(selectedCategory, page);
  }, [page, selectedCategory]);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          {locationFilter?.name !== "ALL" && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => onPressFilter({ type: "location", name: "ALL" })}
            >
              <CloseIcon />
              <Text variant="body3bold">Location: {locationFilter?.name}</Text>
            </TouchableOpacity>
          )}
          {statusFilter?.name !== "ALL" && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => onPressFilter({ type: "status", name: "ALL" })}
            >
              <CloseIcon />
              <Text variant="body3bold" ellipsizeMode="tail">
                Status: {parseCategoryName(statusFilter?.name as string)}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => bottomSheetRef?.current?.expand()}
            style={{ marginRight: 12 }}
          >
            <FilterIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation?.navigate("inventory-creator")}
          >
            <AddIcon />
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
                disabled={isLoading}
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loadMore: {
    paddingVertical: 8,
    backgroundColor: COLORS.blue,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  filterButton: {
    marginRight: 12,
    borderRadius: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
