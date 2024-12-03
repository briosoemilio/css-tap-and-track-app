import React, { useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";

// components
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";

// constants
import { COLORS } from "src/constants/colors";

// hooks
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import { useGetComputerLogsList } from "./hooks/useGetComputerLogsList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import ComputerLogCard from "./components/ComputerLogCard";
import Text from "src/components/Text";

const AdminComputerLogsListScreen = () => {
  const route = useRoute<RouteProp<AdminNavParams, "computer-logs">>();
  const computerIdentifier = route.params?.computerIdentifier;
  const navigation = useAdminNavigation();

  const { computerLogs, isLoading, endReached, loadMore } =
    useGetComputerLogsList(computerIdentifier);

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        {computerIdentifier && (
          <Text variant="body2bold" style={{ marginTop: 15 }}>
            Logs of PC number: {computerIdentifier}
          </Text>
        )}
        <View style={{ marginTop: 12, flex: 1 }}>
          <FlatList
            data={computerLogs}
            renderItem={({ item: computerLogDetails }) => (
              <ComputerLogCard
                computerLogDetails={computerLogDetails}
                onPress={() => showUnderDevelopment()}
              />
            )}
            keyExtractor={(_, index) => `key-${index}`}
            ListFooterComponent={() => {
              return (
                <ListFooter
                  showFooter={
                    !endReached && computerLogs.length > 0 && !isLoading
                  }
                  showLoader={isLoading}
                  onPress={() => loadMore()}
                />
              );
            }}
            ListEmptyComponent={() => !isLoading && <ListEmpty />}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AdminComputerLogsListScreen;

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
