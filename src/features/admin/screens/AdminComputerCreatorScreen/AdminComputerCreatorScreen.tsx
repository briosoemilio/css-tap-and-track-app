import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";

const AdminComputerCreatorScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Admin Computer Creator</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminComputerCreatorScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 12,
    display: "flex",
    justifyContent: "space-between",
  },
});
