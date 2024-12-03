import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";
import { ComputerLog } from "src/services/computer-logs/types";

const ComputerLogCard = (props: {
  computerLogDetails: ComputerLog;
  onPress: () => void;
}) => {
  const { computerLogDetails, onPress } = props;
  const { startedAt, endedAt, userId, computerId } = computerLogDetails;
  return (
    <TouchableOpacity style={styles.itemCard} onPress={onPress}>
      <View>
        <Text variant="body3bold">Computer Number: {computerId}</Text>
        <Text variant="body3bold">Used By: {userId}</Text>
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Started At: {formatDate(startedAt)}
        </Text>
        {endedAt ? (
          <Text variant="body3bold" textAlign="right">
            Ended At: {formatDate(endedAt)}
          </Text>
        ) : (
          <Text
            variant="body3bold"
            textAlign="right"
            style={{ color: COLORS.red }}
          >
            Log still ongoing
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ComputerLogCard;

const styles = StyleSheet.create({
  itemCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
