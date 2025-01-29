import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { useGetComputerLogsList } from "../admin/screens/AdminComputerLogsListScreen/hooks/useGetComputerLogsList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthNavParams } from "src/navigation/AuthNavigator/AuthNavStack";
import ComputerLogCard from "../admin/screens/AdminComputerLogsListScreen/components/ComputerLogCard";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import ListFooter from "../admin/screens/AdminComputerLogsListScreen/components/ListFooter";
import ListEmpty from "../admin/screens/AdminComputerLogsListScreen/components/ListEmpty";
import { useAuth } from "src/context/auth/useAuth";
import BackIcon from "@assets/icons/back-icon.svg";
import Text from "src/components/Text";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

const LogsListScreen = () => {
  const { user } = useAuth();
  const { computerLogs, isLoading, endReached, loadMore } =
    useGetComputerLogsList({ userIdentifier: user?.uuid });
  const navigation = useAuthNavigation();

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
          >
            <BackIcon />
          </TouchableOpacity>
          <Text variant="header2">Logs List</Text>
        </View>
        <FlatList
          data={computerLogs}
          renderItem={({ item: computerLogDetails }) => (
            <ComputerLogCard
              computerLogDetails={computerLogDetails}
              onPress={() =>
                navigation?.navigate("logs-details", {
                  computerIdentifier: computerLogDetails?.uuid,
                })
              }
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
    </ScreenContainer>
  );
};

export default LogsListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
    flexGrow: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 25,
    gap: 15,
  },
});
