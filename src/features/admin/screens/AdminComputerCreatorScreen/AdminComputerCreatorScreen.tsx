import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormDropdown from "src/components/Dropdown/FormDropdown";
import { useLocationList } from "../AdminInventoryListScreen/hooks/useLocationList";
import { parseLocationList } from "../AdminInventoryCreatorScreen/utils";
import ConfirmResetModal from "./components/ConfirmResetModal";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import PeripheralSelector from "./components/PeripheralSelector";
import { useGetCategoryList } from "../AdminInventoryListScreen/hooks/useGetCategoryList";
import Button from "src/components/Button";
import { COLORS } from "src/constants/colors";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import AddMorePeripherals from "./components/AddMorePeripherals";

export type ComputerCreatorForm = {
  name: string;
  metadata: string;
  monitorName: string;
  keyboardName: string;
  mouseName: string;
  systemUnitName: string;
  locationName: string;
  others: { name: string; categoryName: string }[];
};

const AdminComputerCreatorScreen = () => {
  // Form Hooks
  const methods = useFormContext<ComputerCreatorForm>();
  const others = methods.watch("others") || [];

  // React Hooks
  const [showModal, setShowModal] = useState(false);
  const [newLoc, setNewLoc] = useState<string>("");
  useEffect(() => {
    return () => methods.reset();
  }, []);

  // Data
  const { locationList } = useLocationList();
  const LOCATION_OPTIONS = parseLocationList(locationList);

  // Functions
  const handleBeforeLocChange = (value: any) => {
    const prevLoc = methods.getValues("locationName");
    if (prevLoc && prevLoc !== value) {
      setShowModal(true);
      setNewLoc(value);
      return true;
    } else {
      return false;
    }
  };

  const onPressOk = () => {
    methods.reset();
    methods.setValue("locationName", newLoc);
  };

  const createComputer = (formData: ComputerCreatorForm) => {
    console.log({ formData: others });
  };

  return (
    <>
      <ScreenContainer>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <FormDropdown
            label="Location"
            name="locationName"
            rules={{ required: "Location name is required." }}
            placeholder="Select location"
            control={methods.control}
            options={LOCATION_OPTIONS}
            onBeforeChange={(value) => handleBeforeLocChange(value)}
          />
          <FormTextFieldOutline
            label="Name"
            name="name"
            rules={{ required: "Computer name is required." }}
            placeholder="Enter computer name"
            control={methods.control}
          />
          <PeripheralSelector
            category={"MOUSE"}
            value={methods.watch("mouseName")}
          />
          <PeripheralSelector
            category={"KEYBOARD"}
            value={methods.watch("keyboardName")}
          />
          <PeripheralSelector
            category={"MONITOR"}
            value={methods.watch("monitorName")}
          />
          <PeripheralSelector
            category={"SYSTEM_UNIT"}
            value={methods.watch("systemUnitName")}
          />
          {others.map((other, index) => (
            <PeripheralSelector
              category={other.categoryName}
              value={other.name}
              key={`others-${index}`}
            />
          ))}
          <AddMorePeripherals />
          <Button
            title="Create Computer"
            style={{ marginTop: 50 }}
            onPress={methods.handleSubmit(createComputer)}
          />
        </ScrollView>
      </ScreenContainer>
      <ConfirmResetModal
        onPressOk={onPressOk}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default AdminComputerCreatorScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 12,
  },
});
