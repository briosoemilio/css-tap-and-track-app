import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CreatePeripheralForm } from "./types";
import InventoryCreatorForm from "./components/InventoryCreatorForm";
import MetadataForm from "./components/MetadataForm";
import Button from "src/components/Button";
import { createItem } from "src/services/item/createItem";
import CreateSuccessModal from "./components/CreateSuccessModal";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { COLORS } from "src/constants/colors";
import { getErrorMessage } from "src/services/helpers";

const AdminInventoryCreatorScreen = () => {
  // Form Hooks
  const methods = useForm<CreatePeripheralForm>({
    mode: "onChange",
  });

  // React Hooks
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigation = useAdminNavigation();

  // functions
  const onPressSubmit = async (data: CreatePeripheralForm) => {
    try {
      const res = await createItem(data);
      if (res) {
        setShowModal(true);
      }
    } catch (err) {
      const errMessage = getErrorMessage(err);
      console.log("Error on submit of create peripheral -> ", errMessage);
      setError(errMessage);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <ScreenContainer>
          <ScrollView
            style={styles.mainContainer}
            contentContainerStyle={styles.contentContainer}
          >
            <View>
              <InventoryCreatorForm />
              <MetadataForm />
            </View>
            <Button
              title="Create"
              onPress={methods.handleSubmit(onPressSubmit)}
              style={{ marginTop: 50 }}
            />
            {error !== "" && (
              <Text variant="body3bold" style={styles.errorMessage}>
                {error}
              </Text>
            )}
          </ScrollView>
        </ScreenContainer>
      </FormProvider>

      {/* Modals */}
      <CreateSuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        onDismiss={() => {
          navigation?.reset({
            index: 0,
            routes: [
              {
                name: "peripheral-details",
              },
            ],
          });
        }}
      />
    </>
  );
};

export default AdminInventoryCreatorScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 12,
    display: "flex",
    justifyContent: "space-between",
  },
  errorMessage: { color: COLORS.red, marginTop: -50 },
});
