import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import { formatDate } from "src/helpers/formatDate";
import Button from "src/components/Button";
import { Checkbox } from "react-native-paper";
import { COLORS } from "src/constants/colors";
import { createReport } from "src/services/report/createReport";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "src/components/TextField/FormTextField";
import { getItemDetails } from "src/services/item/getItemDetails";
import { ItemDetails } from "src/services/item/types";
import Text from "src/components/Text";

export type ReportItemForm = {
  remarks: string;
};

const ReportItem = (props: { id: number }) => {
  // Custom Hooks
  const navigation = useAuthNavigation();
  const formMethods = useForm<ReportItemForm>({ mode: "onChange" });

  // CONSTANTS
  const now = new Date();

  // React Hooks
  const [itemDetails, setItemDetails] = useState<ItemDetails>();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Functions
  const loadDetails = async () => {
    try {
      const _itemDetails = await getItemDetails(props.id);
      setItemDetails(_itemDetails);
    } catch (err) {
      console.log("Error loading item details -> ", err);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const onPressSubmit = async (data: ReportItemForm) => {
    setIsLoading(true);
    try {
      const { remarks } = data;
      await createReport({
        itemId: itemDetails?.id as number,
        remarks,
      });
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: "success",
            params: {
              message:
                "Your concern has been received. We'll look into it right away.",
            },
          },
        ],
      });
    } catch (err) {
      console.log("Error submitting report => ", err);
      setError("An error has occurred, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <View>
        <TextFieldOutline
          label={"Item"}
          value={itemDetails?.name as string}
          containerStyle={[styles.mb24, styles.mt50]}
          editable={false}
        />
        <TextFieldOutline
          label={"Date"}
          value={formatDate(now.toISOString())}
          containerStyle={styles.mb24}
          editable={false}
        />
        <FormTextField
          control={formMethods.control}
          name="remarks"
          label={"Remarks"}
          textInputStyle={{
            height: 300,
            textAlignVertical: "top",
            flexWrap: "wrap",
          }}
          containerStyle={{ marginVertical: 12, marginBottom: 24 }}
          placeholder="Write your concern here..."
          multiline
          rules={{ required: "Remarks is required" }}
        />
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 12 }}
        >
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setIsChecked((prev) => !prev)}
          />
          <Text style={{ color: COLORS.white, marginLeft: 12 }}>
            I agree that the statements above are true and well-written
          </Text>
        </View>
        <Button
          title="Submit"
          disabled={isChecked === false}
          onPress={formMethods.handleSubmit(onPressSubmit)}
          isLoading={isLoading}
        />
        {error && (
          <Text variant="body2bold" style={{ color: COLORS.red }}>
            {error}
          </Text>
        )}
      </View>
    </FormProvider>
  );
};

export default ReportItem;

const styles = StyleSheet.create({
  mb24: { marginBottom: 24 },
  mt50: { marginTop: 50 },
});
