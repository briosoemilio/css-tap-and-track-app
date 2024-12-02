import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { ItemStatus } from "src/types/ItemStatus";
import { ItemDetails } from "src/services/item/types";
import { ComputerDetails } from "src/services/computer/types";
import { formatDate } from "src/helpers/formatDate";

const ComputerCard = (props: {
  computerDetails: ComputerDetails;
  onPress: () => void;
}) => {
  const { computerDetails, onPress } = props;
  const { name, locationName, status, createdAt } = computerDetails;
  return (
    <TouchableOpacity style={styles.itemCard} onPress={onPress}>
      <View>
        <Text variant="body2bold">{name}</Text>
        <Text variant="body3regular">{locationName}</Text>
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Created At:
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ComputerCard;

const styles = StyleSheet.create({
  itemCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginBottom: 12,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
