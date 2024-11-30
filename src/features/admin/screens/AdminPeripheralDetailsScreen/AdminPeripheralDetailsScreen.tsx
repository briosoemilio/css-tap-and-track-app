import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";

const AdminPeripheralDetailsScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Peripheral Details</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminPeripheralDetailsScreen;

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
