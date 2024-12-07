import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "src/components/Text";
import DatePicker from "src/components/DatePicker/DatePicker";
import Button from "src/components/Button";
import { setDate } from "date-fns";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { generateReportSummary } from "src/services/report/generateReportSummary";
import { getErrorMessage } from "src/services/helpers";
import { COLORS } from "src/constants/colors";

const SummaryGenerator = () => {
  const navigation = useAdminNavigation();
  const [dateStarted, setDateStarted] = useState<Date>();
  const [dateEnded, setDateEnded] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onPressGenerate = async () => {
    try {
      setIsLoading(true);
      const reportSummary = await generateReportSummary(
        dateStarted!,
        dateEnded!
      );
      if (reportSummary) {
        navigation?.navigate("reports-summary", { reportSummary });
      } else {
        setError("An error has occurred. Please try again");
      }
    } catch (err) {
      const errMessage = getErrorMessage(err);
      console.log("Error generating report -> ", errMessage);
      setError("An error has occurred. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ gap: 15, marginBottom: 20 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <DatePicker
          label="Date Started"
          onChange={(date) => setDateStarted(date)}
        />
        <DatePicker
          label="Date Ended"
          onChange={(date) => setDateEnded(date)}
        />
      </View>
      <Button
        title="Generate Summary"
        disabled={!dateStarted && !dateEnded}
        onPress={onPressGenerate}
        isLoading={isLoading}
      />
      {error && (
        <Text variant="body3bold" style={{ color: COLORS.red, marginTop: -15 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default SummaryGenerator;

const styles = StyleSheet.create({});
