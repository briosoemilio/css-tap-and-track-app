import { StyleSheet, View } from "react-native";
import React from "react";
import { ReportDetails } from "src/services/report/types";
import { AdminReportCardInfo } from "../../AdminReportsScreen/components/AdminReportCard";
import Text from "src/components/Text";
import { formatDate } from "src/helpers/formatDate";
import { COLORS } from "src/constants/colors";

const UserReportCard = (props: { reportDetails: AdminReportCardInfo }) => {
  const { reportDetails } = props;
  const {
    itemName,
    locationName,
    reportDetails: _reportDetails,
  } = reportDetails;
  const createdAt = formatDate(_reportDetails?.createdAt);
  const remarks = _reportDetails?.remarks;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 12,
        borderColor: COLORS.white,
        borderWidth: 3,
        borderRadius: 12,
      }}
    >
      <View>
        <Text variant="body2regular">{itemName}</Text>
        <Text variant="body2regular">{remarks}</Text>
      </View>
      <View>
        <Text variant="body2regular">{locationName}</Text>
        <Text variant="body2regular">{createdAt}</Text>
      </View>
    </View>
  );
};

export default UserReportCard;

const styles = StyleSheet.create({});
