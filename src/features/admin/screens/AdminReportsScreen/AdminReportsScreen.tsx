import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";
import AdminReportCard from "./components/AdminReportCard";
import { useAdminReportList } from "./hooks/useAdminReportList";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import SummaryGenerator from "./components/SummaryGenerator";

const AdminReportsScreen = () => {
  // props
  const route = useRoute<RouteProp<AdminNavParams, "reports">>();
  const reportsList = route.params?.reportsList;

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
        <SummaryGenerator />
        <FlatList
          data={reportsList || parsedAdminReportList}
          keyExtractor={(_, index) => `report-${index}`}
          contentContainerStyle={{ gap: 15 }}
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
    gap: 15,
  },
});
