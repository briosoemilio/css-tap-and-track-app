import { StyleSheet, View } from "react-native";
import React from "react";
import { ReportDetails } from "src/services/report/types";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";
import { formatDateTime } from "src/helpers/formatDateTime";

export type AdminReportCardInfo = {
  userName: string;
  itemName: string;
  locationName: string;
  reportDetails: ReportDetails;
  isLastItem?: boolean;
};

const AdminReportCard = (props: AdminReportCardInfo) => {
  const {
    reportDetails,
    userName,
    itemName,
    locationName,
    isLastItem = false,
  } = props;
  const { remarks, createdAt } = reportDetails;
  return (
    <View
      style={[
        {
          borderWidth: 3,
          borderRadius: 12,
          borderColor: COLORS.blue,
          padding: 12,
        },
        isLastItem && { marginBottom: 50 },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="body2bold">{itemName}</Text>
          <Text variant="body3regular">{locationName}</Text>
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
            {formatDateTime(createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text variant="body2bold">Remarks</Text>
        <Text
          variant="body3regular"
          numberOfLines={2}
          style={{ flexWrap: "wrap" }}
          ellipsizeMode="tail"
        >
          {remarks}
        </Text>
      </View>
    </View>
  );
};

export default AdminReportCard;

const styles = StyleSheet.create({});
