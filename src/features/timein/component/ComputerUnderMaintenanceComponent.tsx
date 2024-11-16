import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { ComputerDetails } from "src/services/computer/types";
import LottieView from "lottie-react-native";
import UnderMaintenanceAnimation from "@assets/animation/under-maintenance-lottie.json";
import { COLORS } from "src/constants/colors";

type ComputerUnderMaintenanceComponentProps = {
  computerDetails: ComputerDetails;
};

const ComputerUnderMaintenanceComponent = (
  props: ComputerUnderMaintenanceComponentProps
) => {
  const { computerDetails } = props;
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text variant="header2" textAlign="center" style={{ color: COLORS.red }}>
        UNDER MAINTENANCE
      </Text>
      <LottieView
        style={{ height: 250, width: 250 }}
        source={UnderMaintenanceAnimation}
        autoPlay
        loop
      />
      <Text variant="body2regular" textAlign="center">
        {`This PC is under maintenance.\nPlease use a different one. Thank you!`}
      </Text>
    </View>
  );
};

export default ComputerUnderMaintenanceComponent;

const styles = StyleSheet.create({});
