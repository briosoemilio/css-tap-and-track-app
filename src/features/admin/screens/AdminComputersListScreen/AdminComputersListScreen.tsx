import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";

const AdminComputersListScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        
      </View>
    </ScreenContainer>
  );
};

export default AdminComputersListScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingHorizontal: CONSTANTS.layout },
});
