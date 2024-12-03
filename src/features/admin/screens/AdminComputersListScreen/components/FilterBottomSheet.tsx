import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import CategoryCard from "./CategoryCard";
import { toUpper } from "lodash";
import { FilterOption } from "../hooks/useGetComputersList";
import { useLocationList } from "../../AdminInventoryListScreen/hooks/useLocationList";

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
  filters: FilterOption[];
  onPressFilter: (filter: FilterOption) => void;
  resetFilters: () => void;
}

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
  const { bottomSheetRef, onOpen, filters, onPressFilter, resetFilters } =
    props;
  const { locationList } = useLocationList();
  const locationFilter = filters.find((filter) => filter.type === "location");

  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen();
      }
    },
    [onOpen]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={(index: number) => onSheetChange(index)}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backgroundStyle={{ backgroundColor: COLORS.darkBlue }}
      index={-1}
      snapPoints={["50%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text variant="header3" textAlign="left">
            Filters
          </Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text variant="body2regular">Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Filter by Location */}
        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Location
          </Text>
          <View style={styles.filterContainer}>
            {locationList.map((location, index) => (
              <CategoryCard
                name={toUpper(location.name)}
                isSelected={locationFilter?.name === location.name}
                onPress={() =>
                  onPressFilter({ type: "location", name: location.name })
                }
                key={`location-${index}`}
              />
            ))}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  rowContainer: {
    width: "100%",
    paddingVertical: 12,
    gap: 12,
  },
  filterContainer: { flexDirection: "row", flexWrap: "wrap", rowGap: 12 },
});