import { StyleSheet, View } from "react-native";
import React from "react";
import { ReportDetails } from "src/services/report/types";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";

export type AdminReportCardInfo = {
  userName: string;
  itemName: string;
  locationName: string;
  reportDetails: ReportDetails;
};

const AdminReportCard = (props: {
  userName: string;
  itemName: string;
  locationName: string;
  reportDetails: ReportDetails;
}) => {
  const { reportDetails, userName, itemName, locationName } = props;
  const { remarks, createdAt } = reportDetails;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 3,
        borderRadius: 12,
        borderColor: COLORS.blue,
        padding: 12,
        gap: 8,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text variant="body2bold">{itemName}</Text>
        <Text variant="body3regular">{locationName}</Text>
        <Text variant="body3regular" numberOfLines={1} ellipsizeMode="tail">
          {remarks}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="body2bold" textAlign="right">
          Reported By:
        </Text>
        <Text
          variant="body3regular"
          textAlign="right"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {userName}
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default AdminReportCard;

const styles = StyleSheet.create({});
