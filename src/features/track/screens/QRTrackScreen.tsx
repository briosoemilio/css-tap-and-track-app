import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { useTrackNavigation } from "../useTrackNavigation";

const QRTrackScreen = () => {
  const navigation = useTrackNavigation();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.iconTextContainer}>
          <View style={{ width: 250, marginRight: 24 }}>
            <Text textAlign="center" variant="body2regular">
              Place the QR code inside the box
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
};

export default QRTrackScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
