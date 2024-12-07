import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import Text from "src/components/Text";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import { formatDate } from "src/helpers/formatDate";
import { COLORS } from "src/constants/colors";
import Button from "src/components/Button";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

const AdminReportSummaryScreen = () => {
  const navigation = useAdminNavigation();
  const route = useRoute<RouteProp<AdminNavParams, "reports-summary">>();
  const reportSummary = route?.params?.reportSummary;

  const mostReportedItem = reportSummary?.mostReportedItem?.item;
  const mostReportedItemCount = reportSummary?.mostReportedItem?.count;

  const topReporter = reportSummary?.topReporter?.user;
  const topReportedCount = reportSummary?.topReporter?.count;

  const categoryReportCount = reportSummary?.categoryReportCounts;

  const locationWithMostReports = reportSummary?.locationWithMostReports;
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <TextFieldOutline
          label="Report Start Date"
          value={reportSummary?.reportStart}
          editable={false}
        />
        <TextFieldOutline
          label="Report End Date"
          value={reportSummary?.reportEnd}
          editable={false}
        />
        <Text variant="body2bold">Item with highest number of reports:</Text>
        <TextFieldOutline
          label="Item Name"
          value={mostReportedItem?.name}
          editable={false}
        />
        <TextFieldOutline
          label="Item Category"
          value={mostReportedItem?.category}
          editable={false}
        />
        <TextFieldOutline
          label="Item Location"
          value={mostReportedItem?.location}
          editable={false}
        />
        <TextFieldOutline
          label="Total Report Count"
          value={mostReportedItemCount?.toString()}
          editable={false}
        />
        <Text variant="body2bold">User with highest number of reports:</Text>
        <TextFieldOutline
          label="Name"
          value={topReporter?.name}
          editable={false}
        />
        <TextFieldOutline
          label="Email"
          value={topReporter?.email}
          editable={false}
        />
        <TextFieldOutline
          label="Year And Section"
          value={topReporter?.yearSection}
          editable={false}
        />
        <TextFieldOutline
          label="Total Reports Count"
          value={topReportedCount.toString()}
          editable={false}
        />
        <Text variant="body2bold">Report Count By Category:</Text>
        <TextFieldOutline
          label="Mouse"
          value={categoryReportCount?.MOUSE?.toString() || "0"}
          editable={false}
        />
        <TextFieldOutline
          label="Keyboard"
          value={categoryReportCount?.KEYBOARD?.toString() || "0"}
          editable={false}
        />
        <TextFieldOutline
          label="Monitor"
          value={categoryReportCount?.MONITOR?.toString() || "0"}
          editable={false}
        />
        <TextFieldOutline
          label="System Unit"
          value={categoryReportCount?.SYSTEM_UNIT?.toString() || "0"}
          editable={false}
        />
        <Text variant="body2bold">
          Location with the most number of reports
        </Text>
        <TextFieldOutline
          label="Location name"
          value={locationWithMostReports?.locationName || ""}
          editable={false}
        />
        <TextFieldOutline
          label="Total Reports Count"
          value={locationWithMostReports?.count?.toString() || "0"}
          editable={false}
        />
        <Button
          title="Back to Home"
          onPress={() =>
            navigation?.reset({ index: 0, routes: [{ name: "main" }] })
          }
          style={{ marginTop: 50 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminReportSummaryScreen;

const styles = StyleSheet.create({
  mainContainer: { padding: CONSTANTS.layout, paddingTop: 0 },
  contentContainer: { gap: 15 },
});
