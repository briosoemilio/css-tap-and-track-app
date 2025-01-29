import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import Text from "src/components/Text";
import { DetailValues } from "../AdminPeripheralDetailsScreen/AdminPeripheralDetailsScreen";
import { COLORS } from "src/constants/colors";
import { parseStringifiedMetadata } from "../AdminPeripheralDetailsScreen/utils";
import Button from "src/components/Button";
import { useGetComputerLogDetails } from "./hooks/useGetComputerLogDetails";
import { formatDate } from "src/helpers/formatDate";
import Loader from "src/components/Loader";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import { TagType } from "src/features/track/types";
import { getItemDetails } from "src/services/item/getItemDetails";
import AddIcon from "assets/icons/inventory-list/add-icon.svg";
import DeleteIcon from "assets/icons/inventory-list/delete-icon.svg";
import ArchiveComputerBottomSheet from "./components/ArchiveComputerBottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import ScheduleComputerMaintenanceBottomSheet from "./components/ScheduleComputerMaintenanceBottomSheet";

const DetailComponent = (props: {
  details: DetailValues;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  const { details, onPress, disabled = false } = props;
  const { detail, value } = details;
  return (
    <TouchableOpacity onPress={() => onPress?.()} disabled={disabled}>
      {detail === "archive" ? (
        <Text variant="body2bold">{""}</Text>
      ) : (
        <Text variant="body2bold">{detail}</Text>
      )}
      <View style={styles.attributeContainer}>
        <View style={styles.attributeDetails}>
          <Text variant="body2regular">{value}</Text>
          {value === "Archive Computer" && <DeleteIcon />}
          {value === "Activate Computer" && <AddIcon />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AdminComputerDetailsScreen = () => {
  const route = useRoute<RouteProp<AdminNavParams, "computer-details">>();
  const computerDetails = route.params?.computerDetails;

  const [isItemLoading, setIsItemLoading] = useState(false);
  const archiveComputerBottomSheetRef = useRef<BottomSheetMethods>(null);
  const maintenanceBottomSheetRef = useRef<BottomSheetMethods>(null);

  const navigation = useAdminNavigation();

  const {
    id,
    monitorName,
    keyboardName,
    mouseName,
    systemUnitName,
    locationName,
    metadata: _metadata,
    lastLogUUID,
    isArchived,
  } = computerDetails;
  const metadata = parseStringifiedMetadata(_metadata);

  const { isLoading, computerLogDetails } =
    useGetComputerLogDetails(lastLogUUID);
  const startedAt = computerLogDetails?.startedAt;
  const user = computerLogDetails?.user;
  const computerID = computerLogDetails?.computer?.id;

  const viewItemDetails = async (itemName: string) => {
    try {
      setIsItemLoading(true);
      const itemDetails = await getItemDetails(itemName);
      if (itemDetails) {
        navigation?.navigate("peripheral-details", { itemDetails });
      }
    } catch (err) {
      console.log("error getting item details : ", err);
    } finally {
      setIsItemLoading(false);
    }
  };

  return (
    <ScreenContainer>
      {isItemLoading && (
        <View style={{ position: "absolute", top: "40%", left: "40%" }}>
          <Loader size={"large"} />
        </View>
      )}
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {isArchived && (
          <View>
            <Text variant="header3" style={{ color: COLORS.red }}>
              THIS COMPUTER IS ARCHIVED
            </Text>
          </View>
        )}
        <DetailComponent
          details={{ detail: "Location", value: locationName }}
          disabled
        />
        {metadata?.map((attribute, index) => (
          <DetailComponent
            key={`metadata-${index}`}
            details={{ detail: attribute.detail, value: attribute.value }}
            disabled
          />
        ))}
        <DetailComponent
          details={{ detail: "Monitor", value: monitorName }}
          onPress={() => viewItemDetails(monitorName)}
        />
        <DetailComponent
          details={{ detail: "Keyboard", value: keyboardName }}
          onPress={() => viewItemDetails(keyboardName)}
        />
        <DetailComponent
          details={{ detail: "Mouse", value: mouseName }}
          onPress={() => viewItemDetails(mouseName)}
        />
        <DetailComponent
          details={{ detail: "System Unit", value: systemUnitName }}
          onPress={() => viewItemDetails(systemUnitName)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DetailComponent
            onPress={() =>
              navigation?.navigate("write-tag", {
                tagType: TagType.COMPUTER,
                id: computerDetails?.id,
              })
            }
            details={{
              detail: "NFC",
              value: "Tap to Write Tag",
            }}
          />
          <DetailComponent
            onPress={() => archiveComputerBottomSheetRef?.current?.expand()}
            details={{
              detail: "archive",
              value: isArchived ? "Activate Computer" : "Archive Computer",
            }}
          />
        </View>
        <Button
          title="Schedule Maintenance"
          style={{ backgroundColor: COLORS.red, marginTop: 12 }}
          onPress={() => maintenanceBottomSheetRef?.current?.expand()}
        />
        {isLoading ? (
          <Loader />
        ) : (
          lastLogUUID && (
            <View style={{ gap: 15 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text variant="body2bold">Last Used By</Text>
                  <Text variant="body2regular">{user?.name}</Text>
                  <Text variant="body3regular">{user?.yearSection}</Text>
                </View>
                <View>
                  <Text variant="body2bold">Last Used At</Text>
                  <Text variant="body2regular">{formatDate(startedAt!)}</Text>
                </View>
              </View>
              <Button
                title="View Logs"
                onPress={() =>
                  navigation?.navigate("computer-logs", {
                    computerIdentifier: computerID!,
                  })
                }
              />
            </View>
          )
        )}
      </ScrollView>
      <ArchiveComputerBottomSheet
        computerId={id}
        isArchived={isArchived}
        bottomSheetRef={archiveComputerBottomSheetRef}
      />
      <ScheduleComputerMaintenanceBottomSheet
        computerId={id}
        bottomSheetRef={maintenanceBottomSheetRef}
      />
    </ScreenContainer>
  );
};

export default AdminComputerDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
  attributeContainer: {
    backgroundColor: COLORS.transparent,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  attributeDetails: { display: "flex", flexDirection: "row", gap: 15 },
});
