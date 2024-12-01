import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import { useLocationList } from "../AdminInventoryListScreen/hooks/useLocationList";
import BottomSheet from "@gorhom/bottom-sheet";

const AdminUsersListScreen = () => {
  const { locationList } = useLocationList(false);
  const addLocationBottomSheetRef = useRef<BottomSheet>(null);
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          style={styles.addLocation}
          onPress={() => addLocationBottomSheetRef?.current?.expand()}
        >
          <Text variant="body2bold">Users</Text>
        </TouchableOpacity>
        {/* {locationList.map((location, index) => (
          <LocationCard location={location} key={`location-${index}`} />
        ))} */}
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminUsersListScreen;

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
