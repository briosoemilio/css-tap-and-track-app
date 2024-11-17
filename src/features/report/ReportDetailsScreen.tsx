import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";
import { AuthNavParams } from "src/navigation/AuthNavigator/AuthNavStack";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import TextField from "src/components/TextField/TextField";

const ReportDetailsScreen = () => {
  const navigation = useAuthNavigation();
  const route = useRoute<RouteProp<AuthNavParams, "report-details">>();
  const { itemName, date, categoryName, remarks } = route.params;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TextFieldOutline
          label={"Computer"}
          value={itemName}
          containerStyle={[styles.mb24, styles.mt50]}
          editable={false}
        />
        <TextFieldOutline
          label={"Date"}
          value={date}
          containerStyle={styles.mb24}
          editable={false}
        />
        <TextFieldOutline
          label={"Peripheral"}
          value={categoryName}
          containerStyle={styles.mb24}
          editable={false}
        />
        <TextField
          label={"Note concern to the reported peripheral:"}
          textInputStyle={{
            height: 300,
            textAlignVertical: "top",
            flexWrap: "wrap",
            color: COLORS.black,
          }}
          containerStyle={{ marginVertical: 12, marginBottom: 24 }}
          value={remarks}
          multiline
          editable={false}
        />

        <View>
          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ReportDetailsScreen;

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
  mb24: { marginBottom: 24 },
  mt50: { marginTop: 50 },
});
