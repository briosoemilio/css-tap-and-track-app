import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";
import { MaintenanceDetails } from "src/services/maintenance/types";

const MaintenanceCard = (props: {
  maintenanceDetails: MaintenanceDetails;
  onPress: () => void;
}) => {
  const { maintenanceDetails, onPress } = props;
  const { scheduledBy, computerId, scheduleDate, isDone } = maintenanceDetails;
  return (
    <TouchableOpacity style={[styles.itemCard]} onPress={onPress}>
      <View>
        <Text variant="body2bold">Computer ID: {computerId}</Text>
        {isDone && (
          <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Text variant="body3bold">STATUS:</Text>
            <Text variant="body3regular" style={{ color: COLORS.green }}>
              DONE
            </Text>
          </View>
        )}
        {!isDone && (
          <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Text variant="body3bold">STATUS:</Text>
            <Text variant="body3regular" style={{ color: COLORS.red }}>
              ONGOING
            </Text>
          </View>
        )}
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Maintenance Date:
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(scheduleDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MaintenanceCard;

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
