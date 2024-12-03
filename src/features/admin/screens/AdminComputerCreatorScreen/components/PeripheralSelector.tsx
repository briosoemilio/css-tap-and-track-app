import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ComputerCreatorForm } from "../AdminComputerCreatorScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import { parseCategoryName } from "../../AdminInventoryListScreen/utils";

const PeripheralSelector = (props: { category: string }) => {
  const [error, setError] = useState("");
  const { category } = props;
  const navigation = useAdminNavigation();
  const methods = useFormContext<ComputerCreatorForm>();
  const location = methods?.watch("locationName");

  useEffect(() => {
    if (location && error) {
      setError("");
    }
  }, [error, location]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (!location) {
            return setError("Please select location first.");
          } else {
            setError("");
            navigation?.push("computer-peripheral-select", {
              location,
              category,
            });
          }
        }}
      >
        <TextFieldOutline
          label={parseCategoryName(category)}
          placeholder={`Select ${parseCategoryName(category)}`}
          editable={false}
          error={error}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PeripheralSelector;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.transparent,
    padding: 12,
    borderRadius: 12,
    borderColor: COLORS.blue,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
