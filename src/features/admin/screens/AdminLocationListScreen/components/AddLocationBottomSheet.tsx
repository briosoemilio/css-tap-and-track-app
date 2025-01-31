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

interface AddLocationBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const AddLocationBottomSheet = (props: AddLocationBottomSheetProps) => {
  // props
  const { bottomSheetRef, onOpen } = props;

  // constants
  const FLOOR_OPTIONS = [
    { id: 1, label: "First Floor", value: FloorType.FIRST_FLOOR },
    { id: 2, label: "Second Floor", value: FloorType.SECOND_FLOOR },
    { id: 3, label: "Third Floor", value: FloorType.THIRD_FLOOR },
    { id: 4, label: "Fourth Floor", value: FloorType.FOURTH_FLOOR },
  ];

  // nav hooks
  const navigation = useAdminNavigation();

  // custom hooks
  const methods = useForm<{ name: string; floor: FloorType }>({
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

  const onPressAdd = async (data: { name: string; floor: string }) => {
    setIsLoading(true);
    try {
      const { name, floor } = data;
      const res = await createLocation(name, floor);
      if (res) {
        navigation?.reset({
          index: 2,
          routes: [
            {
              name: "main",
            },
            {
              name: "add-location",
            },
            {
              name: "success",
              params: { message: "Successfully created new location." },
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
              Add Room
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
                placeholder="Please input room name."
                control={methods.control}
                rules={{ required: "Room Name is required." }}
              />
              <FormDropdown
                label="Floor"
                name="floor"
                control={methods.control}
                rules={{ required: "Floor is required." }}
                placeholder="Please select floor."
                options={FLOOR_OPTIONS}
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

export default AddLocationBottomSheet;

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
