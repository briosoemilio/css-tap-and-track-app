import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

// components
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import FilterIcon from "@assets/icons/inventory-list/filter-icon.svg";
import FilterBottomSheet from "./components/FilterBottomSheet";
import CloseIcon from "@assets/icons/close-icon.svg";
import AddIcon from "@assets/icons/inventory-list/add-icon.svg";

// constants
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";

// hooks
import { useGetComputersList } from "./hooks/useGetComputersList";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import ComputerCard from "./components/ComputerCard";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import Button from "src/components/Button";

const AdminComputersListScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useAdminNavigation();

  const {
    computersList,
    endReached,
    isLoading,
    filters,
    resetFilters,
    onPressFilter,
    loadMoreComputers,
  } = useGetComputersList();

  const locationFilter = filters?.find((filter) => filter.type === "location");

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
          <TouchableOpacity
            onPress={() => bottomSheetRef?.current?.expand()}
            style={{ marginRight: 12 }}
          >
            <FilterIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showUnderDevelopment()}>
            <AddIcon />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 12, flex: 1 }}>
          <FlatList
            data={computersList}
            renderItem={({ item: computerDetails }) => (
              <ComputerCard
                computerDetails={computerDetails}
                onPress={() =>
                  navigation?.navigate("computer-details", {
                    computerDetails,
                  })
                }
              />
            )}
            keyExtractor={(_, index) => `key-${index}`}
            ListFooterComponent={() => {
              return (
                <ListFooter
                  showFooter={
                    !endReached && computersList.length > 0 && !isLoading
                  }
                  showLoader={isLoading}
                  onPress={() => loadMoreComputers()}
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
      <Button
        title="Go To Computer Logs"
        style={{ marginHorizontal: CONSTANTS.layout }}
        onPress={() => navigation?.navigate("computer-logs")}
      />
    </ScreenContainer>
  );
};

export default AdminComputersListScreen;

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
