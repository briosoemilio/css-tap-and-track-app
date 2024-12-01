import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import ScreenContainer from "src/components/ScreenContainer";

const AdminReportsScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>AdminReportsScreen</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminReportsScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
});
