import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "src/constants/colors";
import ReportIcon from "@assets/icons/report-file-icon.svg";
import Text from "src/components/Text";

const ReportCard = (props: {
  itemName: string;
  peripheralType: string;
  dateCreated: string;
  onPress: () => void;
}) => {
  const { itemName, peripheralType, dateCreated, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <View style={styles.flexContainer}>
        <ReportIcon />
        <View style={styles.ml12}>
          <Text variant="body2bold">{itemName}</Text>
          <Text variant="body2regular">{peripheralType}</Text>
        </View>
      </View>
      <Text variant="body3regular">{dateCreated}</Text>
    </TouchableOpacity>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.blue,
    marginBottom: 24,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ml12: { marginLeft: 12 },
});
