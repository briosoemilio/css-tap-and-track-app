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
import Loader from "src/components/Loader";
import Button from "src/components/Button";
import OptionCard from "./OptionCard";

// hooks
import { useLocationList } from "../../AdminInventoryListScreen/hooks/useLocationList";
import { updateItemLocation } from "src/services/item/updateItemLocation";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { getErrorMessage } from "src/services/helpers";

interface UpdateLocationBottomSheetProps {
  itemId: number;
  locationName: string;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen?: () => Promise<void>;
}

const UpdateLocationBottomSheet = (props: UpdateLocationBottomSheetProps) => {
  // props
  const { itemId, locationName, bottomSheetRef, onOpen } = props;

  // nav hooks
  const navigation = useAdminNavigation();

  // custom hooks
  const { locationList, isLoading: isLocationLoading } = useLocationList(false);

  // react hooks
  const [selectedLocation, setSelectedLocation] = useState(locationName);
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

  const onPressSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateItemLocation(itemId, selectedLocation);
      if (res) {
        navigation?.reset({
          index: 2,
          routes: [
            {
              name: "main",
            },
            {
              name: "inventory",
            },
            {
              name: "success",
              params: { message: "Successfully updated Item Location" },
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
            Update Location
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          {isLocationLoading ? (
            <Loader />
          ) : (
            <View style={styles.locationsContainer}>
              {locationList.map((location, index) => (
                <OptionCard
                  optionText={location.name}
                  key={`location-${index}`}
                  isSelected={location.name === selectedLocation}
                  onPress={() => setSelectedLocation(location.name)}
                />
              ))}
            </View>
          )}
          <View>
            <Button
              title="Save"
              style={{
                backgroundColor:
                  locationName === selectedLocation
                    ? COLORS.disabledGreen
                    : COLORS.green,
              }}
              disabled={locationName === selectedLocation}
              onPress={onPressSave}
              isLoading={isLoading}
            />
            <Text variant="body2regular" style={{ color: COLORS.red }}>
              {errMessage}
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default UpdateLocationBottomSheet;

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
