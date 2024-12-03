import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { useFormContext } from "react-hook-form";
import { ComputerCreatorForm } from "../AdminComputerCreatorScreen";
import Button from "src/components/Button";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";

const AddMorePeripherals = () => {
  const [error, setError] = useState("");
  const navigation = useAdminNavigation();
  const methods = useFormContext<ComputerCreatorForm>();
  const location = methods?.watch("locationName");
  const category = "OTHERS";

  const onPressAdd = () => {
    if (!location) {
      return setError("Please select location first.");
    } else {
      setError("");
      navigation?.push("computer-peripheral-select", {
        location,
        category,
      });
    }
  };

  useEffect(() => {
    if (location && error) {
      setError("");
    }
  }, [error, location]);

  return (
    <View style={{ marginTop: 8 }}>
      <Button
        title="Add More Peripherals"
        onPress={onPressAdd}
        style={{ backgroundColor: COLORS.green }}
      />
      <Text variant="body3bold" style={{ color: COLORS.red }}>
        {error}
      </Text>
    </View>
  );
};

export default AddMorePeripherals;

const styles = StyleSheet.create({});
