import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { ComputerDetails } from "src/services/computer/types";

type ComputerInUseComponentProps = {
  computerDetails: ComputerDetails;
};

const ComputerInUseComponent = (props: ComputerInUseComponentProps) => {
  const { computerDetails } = props;
  return (
    <View>
      <Text>ComputerInUseComponent</Text>
    </View>
  );
};

export default ComputerInUseComponent;

const styles = StyleSheet.create({});
