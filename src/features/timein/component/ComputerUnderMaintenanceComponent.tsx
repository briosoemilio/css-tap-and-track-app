import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { ComputerDetails } from "src/services/computer/types";

type ComputerUnderMaintenanceComponentProps = {
  computerDetails: ComputerDetails;
};

const ComputerUnderMaintenanceComponent = (
  props: ComputerUnderMaintenanceComponentProps
) => {
  const { computerDetails } = props;
  return (
    <View>
      <Text>ComputerUnderMaintenanceComponent</Text>
    </View>
  );
};

export default ComputerUnderMaintenanceComponent;

const styles = StyleSheet.create({});
