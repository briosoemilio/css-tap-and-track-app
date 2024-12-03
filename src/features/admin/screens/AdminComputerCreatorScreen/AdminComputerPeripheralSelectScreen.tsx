import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";

const AdminComputerPeripheralSelectScreen = () => {
  const route =
    useRoute<RouteProp<AdminNavParams, "computer-peripheral-selector">>();
  const location = route.params?.location;
  const category = route.params?.category;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Here are the list of available items with the parameters: </Text>
        <Text>Location: {location}</Text>
        <Text>Location: {category}</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminComputerPeripheralSelectScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
});
