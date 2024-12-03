import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import { useGetComputerLogDetails } from "../AdminComputerDetailsScreen/hooks/useGetComputerLogDetails";
import Text from "src/components/Text";
import { formatDate } from "src/helpers/formatDate";
import { COLORS } from "src/constants/colors";
import { getUserDetails } from "src/services/user/getUserDetails";
import { useGetUserDetails } from "../AdminUsersListScreen/hooks/useGetUserDetails";
import Button from "src/components/Button";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

const AdminComputerLogsDetailsScreen = () => {
  const navigation = useAdminNavigation();

  const route = useRoute<RouteProp<AdminNavParams, "computer-logs-details">>();
  const computerIdentifier = route.params?.computerIdentifier;

  const { computerLogDetails, isLoading: isComputerLogLoading } =
    useGetComputerLogDetails(computerIdentifier);

  const user = computerLogDetails?.user;
  const computer = computerLogDetails?.computer;
  const startedAt = computerLogDetails?.startedAt;
  const endedAt = computerLogDetails?.endedAt;

  const _endedBy = computerLogDetails?.endedBy;
  const { userDetails: endedBy, isLoading: isUserDetailsLoading } =
    useGetUserDetails(_endedBy as number);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text variant="body2bold">Started Details</Text>
          <Text variant="body2regular">
            Started At: {formatDate(startedAt!)}
          </Text>
        </View>
        <View>
          <Text variant="body2bold">User Details</Text>
          <Text variant="body2regular">Name: {user?.name}</Text>
          <Text variant="body2regular">Year Section: {user?.yearSection}</Text>
          <Text variant="body2regular">ID Number: {user?.idNumber}</Text>
        </View>
        <View>
          <Text variant="body2bold">Computer Details</Text>
          <Text variant="body2regular">Name: {computer?.name}</Text>
          <Text variant="body2regular">Location: {computer?.locationName}</Text>
        </View>
        {endedAt ? (
          <View>
            <Text variant="body2bold">Ended Details</Text>
            <Text variant="body2regular">Ended By: {endedBy?.name}</Text>
            <Text variant="body2regular">Ended At: {formatDate(endedAt!)}</Text>
          </View>
        ) : (
          <View>
            <Text variant="body2bold" style={{ color: COLORS.red }}>
              Log still ongoing
            </Text>
          </View>
        )}
      </ScrollView>
      <Button
        title="Back To Home"
        style={{ marginHorizontal: CONSTANTS.layout }}
        onPress={() =>
          navigation?.reset({ index: 0, routes: [{ name: "main" }] })
        }
      />
    </ScreenContainer>
  );
};

export default AdminComputerLogsDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
