import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { ComputerDetails } from "src/services/computer/types";
import { formatDate } from "src/helpers/formatDate";
import ArchiveImage from "assets/png/archived-png.png";
import { MaintenanceDetails } from "src/services/maintenance/types";

const MaintenanceCard = (props: {
  maintenanceDetails: MaintenanceDetails;
  onPress: () => void;
}) => {
  const { maintenanceDetails, onPress } = props;
  const { scheduledBy, computerId, scheduleDate } = maintenanceDetails;
  return (
    <TouchableOpacity style={[styles.itemCard]} onPress={onPress}>
      <View>
        <Text variant="body2bold">Scheduled By: {scheduledBy}</Text>
        <Text variant="body3regular">Computer ID: {computerId}</Text>
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
