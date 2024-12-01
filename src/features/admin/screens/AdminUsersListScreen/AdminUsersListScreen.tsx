import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useUserList } from "./hooks/useUserList";
import UserCard from "./components/UserCard";
import { FlatList } from "react-native-gesture-handler";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import ViewUserDetailsBottomSheet from "./components/ViewUserDetailsBottomSheet";
import { UserDetails } from "src/services/user/types";
import { useUserReportsList } from "./hooks/useUserReportsList";

const AdminUsersListScreen = () => {
  const { usersList, endReached, isLoading, loadMore } = useUserList();
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const viewUserInfoBottomSheetRef = useRef<BottomSheet>(null);

  const onPressCard = (user: UserDetails) => {
    loadReports(1, user?.id);
    setUserDetails(user);
    viewUserInfoBottomSheetRef?.current?.expand();
  };

  const {
    resetState,
    parsedList,
    loadReports,
    isLoading: isUserReportsLoading,
  } = useUserReportsList();

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <FlatList
          data={usersList}
          keyExtractor={(_, index) => `user-${index}`}
          renderItem={({ item: user }) => (
            <UserCard userDetails={user} onPress={() => onPressCard(user)} />
          )}
          ListFooterComponent={() => {
            return (
              <ListFooter
                showFooter={!endReached && usersList.length > 0 && !isLoading}
                showLoader={isLoading}
                onPress={() => loadMore()}
              />
            );
          }}
          ListEmptyComponent={() => !isLoading && <ListEmpty />}
        />
      </View>
      <ViewUserDetailsBottomSheet
        bottomSheetRef={viewUserInfoBottomSheetRef}
        userDetails={userDetails!}
        isLoading={isUserReportsLoading}
        parsedList={parsedList}
        onClose={resetState}
      />
    </ScreenContainer>
  );
};

export default AdminUsersListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
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
