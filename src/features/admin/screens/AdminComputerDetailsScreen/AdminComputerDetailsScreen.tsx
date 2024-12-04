import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
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

const DetailComponent = (props: {
  details: DetailValues;
  onPress?: () => void;
}) => {
  const { details } = props;
  const { detail, value } = details;
  return (
    <View>
      <Text variant="body2bold">{detail}</Text>
      <View style={styles.attributeContainer}>
        <View style={styles.attributeDetails}>
          <Text variant="body2regular">{value}</Text>
        </View>
      </View>
    </View>
  );
};

const AdminComputerDetailsScreen = () => {
  const route = useRoute<RouteProp<AdminNavParams, "computer-details">>();
  const computerDetails = route.params?.computerDetails;

  const navigation = useAdminNavigation();

  const {
    monitorName,
    keyboardName,
    mouseName,
    systemUnitName,
    locationName,
    metadata: _metadata,
    lastLogUUID,
  } = computerDetails;
  const metadata = parseStringifiedMetadata(_metadata);

  const { isLoading, computerLogDetails } =
    useGetComputerLogDetails(lastLogUUID);
  const startedAt = computerLogDetails?.startedAt;
  const user = computerLogDetails?.user;
  const computerID = computerLogDetails?.computer?.id;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <DetailComponent
          details={{ detail: "Location", value: locationName }}
        />
        {metadata?.map((attribute, index) => (
          <DetailComponent
            key={`metadata-${index}`}
            details={{ detail: attribute.detail, value: attribute.value }}
          />
        ))}
        <DetailComponent details={{ detail: "Monitor", value: monitorName }} />
        <DetailComponent
          details={{ detail: "Keyboard", value: keyboardName }}
        />
        <DetailComponent details={{ detail: "Mouse", value: mouseName }} />
        <DetailComponent
          details={{ detail: "System Unit", value: systemUnitName }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate("write-tag", {
                tagType: TagType.COMPUTER,
                id: computerDetails?.id,
              })
            }
          >
            <DetailComponent
              details={{
                detail: "NFC",
                value: "Tap to Write Tag",
              }}
            />
          </TouchableOpacity>
        </View>
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
