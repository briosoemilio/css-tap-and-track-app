import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";
import AdminReportCard from "./components/AdminReportCard";
import { useAdminReportList } from "./hooks/useAdminReportList";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";

const AdminReportsScreen = () => {
  const {
    parsedAdminReportList,
    endReached,
    reportList,
    isLoading,
    loadMoreReports,
  } = useAdminReportList();

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <FlatList
          data={parsedAdminReportList}
          keyExtractor={(_, index) => `report-${index}`}
          renderItem={({ item: report }) => (
            <AdminReportCard
              userName={report.userName}
              itemName={report.itemName}
              locationName={report.locationName}
              reportDetails={report.reportDetails}
            />
          )}
          ListFooterComponent={() => {
            return (
              <ListFooter
                showFooter={!endReached && reportList.length > 0 && !isLoading}
                showLoader={isLoading}
                onPress={() => loadMoreReports()}
              />
            );
          }}
          ListEmptyComponent={() => !isLoading && <ListEmpty />}
        />
      </View>
    </ScreenContainer>
  );
};

export default AdminReportsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
    paddingTop: 20,
    gap: 15,
  },
});
