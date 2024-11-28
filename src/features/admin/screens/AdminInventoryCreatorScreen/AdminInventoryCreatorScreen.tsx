import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";

const AdminInventoryCreatorScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text>AdminInventoryCreatorScreen</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminInventoryCreatorScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 80,
  },
});
