import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";
import NFCTrackAnimation from "@assets/animation/nfc-lottie.json";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { ItemStatus } from "src/types/ItemStatus";
import CategoryCard from "./CategoryCard";
import { useLocationList } from "../hooks/useLocationList";
import { capitalize, toUpper, upperCase } from "lodash";

interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const FilterBottomSheet = (props: FilterBottomSheetProps) => {
  const { bottomSheetRef, onOpen } = props;
  const { locationList } = useLocationList();

  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen(); // Call `onOpen` when the bottom sheet is opened
      }
    },
    [onOpen]
  );

  const itemStatusData = [
    { status: "ALL" },
    { status: ItemStatus.AVAILABLE },
    { status: ItemStatus.IN_USE },
    { status: ItemStatus.UNDER_MAINTENANCE },
  ];

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
          <TouchableOpacity>
            <Text variant="body2regular">Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Filter by Location */}
        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Location
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 12 }}>
            {locationList.map((location, index) => (
              <CategoryCard
                name={toUpper(location.name)}
                isSelected={false}
                onPress={() => null}
                key={`location-${index}`}
              />
            ))}
          </View>
        </View>

        {/* Filter by Status */}
        <View style={styles.rowContainer}>
          <Text variant="body2bold" textAlign="left">
            Status
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 12 }}>
            {itemStatusData.map((itemStatus, index) => (
              <CategoryCard
                name={capitalize(itemStatus.status)}
                isSelected={false}
                onPress={() => null}
                key={`category-${index}`}
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
});
