import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { FlatList } from "react-native-gesture-handler";
import MaintenanceCard from "./components/MaintenanceCard";
import { useGetComputerMaintenance } from "../AdminComputerDetailsScreen/hooks/useGetComputerMaintenance";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { MaintenanceDetails } from "src/services/maintenance/types";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MaintenanceDetailsBottomSheet from "./components/MaintenanceDetailsBottomSheet";

const AdminMaintenanceScreen = () => {
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<MaintenanceDetails>();
  const detailsBottomSheetRef = useRef<BottomSheetMethods>(null);
  const { maintenanceList, endReached, isLoading, loadMoreItems } =
    useGetComputerMaintenance();
  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View>
          <FlatList
            data={maintenanceList}
            renderItem={({ item: maintenanceDetails }) => (
              <MaintenanceCard
                maintenanceDetails={maintenanceDetails}
                onPress={() => {
                  setSelectedMaintenance(maintenanceDetails);
                  detailsBottomSheetRef?.current?.expand();
                }}
              />
            )}
            keyExtractor={(_, index) => `key-${index}`}
            ListFooterComponent={() => {
              return (
                <ListFooter
                  showFooter={
                    !endReached && maintenanceList.length > 0 && !isLoading
                  }
                  showLoader={isLoading}
                  onPress={() => loadMoreItems()}
                />
              );
            }}
            ListEmptyComponent={() => !isLoading && <ListEmpty />}
          />
        </View>
      </View>
      <MaintenanceDetailsBottomSheet
        bottomSheetRef={detailsBottomSheetRef}
        maintenanceDetails={selectedMaintenance as MaintenanceDetails}
      />
    </ScreenContainer>
  );
};

export default AdminMaintenanceScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
});
