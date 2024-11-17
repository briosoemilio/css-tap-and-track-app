import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import ScreenContainer from "src/components/ScreenContainer";
import { AuthNavParams } from "src/navigation/AuthNavigator/AuthNavStack";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { TagType } from "../track/types";
import ReportComputer from "./components/ReportComputer";
import ReportItem from "./components/ReportItem";

const ContentSwitcher = (props: { id: number; tagType: TagType }) => {
  const { id, tagType } = props;

  switch (tagType) {
    case TagType.COMPUTER: {
      return <ReportComputer id={id} />;
    }
    case TagType.ITEM: {
      return <ReportItem id={id} />;
    }
  }
};

const ReportScreen = () => {
  const navigation = useAuthNavigation();
  const route = useRoute<RouteProp<AuthNavParams, "report">>();
  const { id, tagType } = route.params;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <ContentSwitcher id={id} tagType={tagType} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex1: { flex: 1 },
  peripheralDetected: { color: COLORS.red, marginBottom: 12 },
  detailsContainer: {
    backgroundColor: COLORS.gray,
    padding: 12,
    borderRadius: 12,
  },
});
