// Libe
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// components
import Text from "src/components/Text";
import Button from "src/components/Button";

// hooks
import { useLocationList } from "../../AdminInventoryListScreen/hooks/useLocationList";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { getErrorMessage } from "src/services/helpers";
import { FormProvider, useForm } from "react-hook-form";
import { FloorType } from "src/types/FloorType";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";
import FormDropdown from "src/components/Dropdown/FormDropdown";
import { createLocation } from "src/services/location/addLocation";
import { createCategory } from "src/services/category/createCategory";

interface AddCategoryBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const AddCategoryBottomSheet = (props: AddCategoryBottomSheetProps) => {
  // props
  const { bottomSheetRef, onOpen } = props;

  // nav hooks
  const navigation = useAdminNavigation();

  // custom hooks
  const methods = useForm<{ name: string }>({
    mode: "onChange",
  });

  // react hooks
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // functions
  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen(); // Call `onOpen` when the bottom sheet is opened
      }
    },
    [onOpen]
  );

  const onPressAdd = async (data: { name: string }) => {
    setIsLoading(true);
    try {
      const { name } = data;
      const res = await createCategory(name);
      if (res) {
        navigation?.reset({
          index: 2,
          routes: [
            {
              name: "main",
            },
            {
              name: "add-category",
            },
            {
              name: "success",
              params: { message: "Successfully created new category." },
            },
          ],
        });
      }
    } catch (err) {
      console.log("Error on press ssave =>", err);
      const _errMessage = getErrorMessage(err);
      setErrMessage(_errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={(index: number) => onSheetChange(index)}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backgroundStyle={{ backgroundColor: COLORS.darkBlue }}
        index={-1}
        snapPoints={["50%"]}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text variant="header3" textAlign="left">
              Add Category
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <View style={{ gap: 15, marginTop: 15 }}>
              <FormTextFieldOutline
                label="Name"
                name="name"
                placeholder="Please input category name."
                control={methods.control}
                rules={{ required: "Category Name is required." }}
              />
            </View>
            <Button
              title="Add"
              style={{ backgroundColor: COLORS.green }}
              onPress={methods.handleSubmit(onPressAdd)}
              isLoading={isLoading}
            />
            <Text
              variant="body2regular"
              style={{ color: COLORS.red, marginTop: -15 }}
            >
              {errMessage}
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </FormProvider>
  );
};

export default AddCategoryBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
    flexGrow: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  locationsContainer: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
});
