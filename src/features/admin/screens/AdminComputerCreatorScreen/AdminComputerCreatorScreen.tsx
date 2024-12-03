import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { FormProvider, useForm } from "react-hook-form";
import FormDropdown from "src/components/Dropdown/FormDropdown";
import { useLocationList } from "../AdminInventoryListScreen/hooks/useLocationList";
import { parseLocationList } from "../AdminInventoryCreatorScreen/utils";
import ConfirmResetModal from "./components/ConfirmResetModal";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";

export type ComputerCreatorForm = {
  name: string;
  metadata: string;
  monitorName: string;
  keyboardName: string;
  mouseName: string;
  systemUnitName: string;
  locationName: string;
  others: string[];
};

const AdminComputerCreatorScreen = () => {
  const methods = useForm<ComputerCreatorForm>();
  const [showModal, setShowModal] = useState(false);
  const [newLoc, setNewLoc] = useState<string>("");

  const { locationList } = useLocationList();
  const LOCATION_OPTIONS = parseLocationList(locationList);

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

  const resetForm = () => {
    methods.resetField("name");
    methods.resetField("keyboardName");
    methods.resetField("metadata");
    methods.resetField("monitorName");
    methods.resetField("mouseName");
    methods.resetField("others");
    methods.resetField("systemUnitName");
  };

  const onPressOk = () => {
    resetForm();
    methods.setValue("locationName", newLoc);
  };

  return (
    <FormProvider {...methods}>
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
        </ScrollView>
      </ScreenContainer>
      <ConfirmResetModal
        onPressOk={onPressOk}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </FormProvider>
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
