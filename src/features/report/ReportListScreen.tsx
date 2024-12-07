import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { getReportList } from "src/services/report/getReportList";
import ReportCard from "./components/ReportCard";
import { parseReportList } from "./utils";

export type ReportCardInfo = {
  name: string;
  categoryName: string;
  date: string;
  remarks: string;
};

const ReportListScreen = () => {
  const navigation = useAuthNavigation();
  const [reportList, setReportList] = useState<ReportCardInfo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const loadList = async (nextPage: number) => {
    if (isLoading || endReached) return;
    setIsLoading(true);
    try {
      const { data, total } = await getReportList(nextPage);
      if (total < 10) {
        setEndReached(true);
      }
      const parsedReportList = await parseReportList(data);
      // Append new data to the list
      setReportList((prev) => [...prev, ...parsedReportList]);
    } catch (err) {
      console.log("Error getting report list -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadList(page);
  }, [page]);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <FlatList
          data={reportList}
          ListHeaderComponent={() => (
            <Text variant="header2" style={{ marginBottom: 24 }}>
              Reports
            </Text>
          )}
          renderItem={({ item }) => (
            <ReportCard
              itemName={item.name}
              peripheralType={item.categoryName}
              dateCreated={item.date}
              onPress={() =>
                navigation.navigate("report-details", {
                  itemName: item.name,
                  categoryName: item.categoryName,
                  date: item.date,
                  remarks: item.remarks,
                })
              }
            />
          )}
          keyExtractor={(_, index) => `key-${index}`}
          onEndReached={() => {
            if (endReached || isScrolling === false) return;
            setPage((prev) => prev + 1);
          }}
          onEndReachedThreshold={0.1} // Trigger when reaching 50% of the list
          onMomentumScrollBegin={() => setIsScrolling(true)}
          ListFooterComponent={() =>
            isLoading && <Text variant="body2regular">Loading...</Text>
          }
        />
      </View>
    </ScreenContainer>
  );
};

export default ReportListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
    flexGrow: 1,
    paddingTop: 40,
  },
});
