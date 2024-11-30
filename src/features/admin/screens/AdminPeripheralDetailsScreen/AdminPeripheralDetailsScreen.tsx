import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import Text from "src/components/Text";
import { CONSTANTS } from "src/constants/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import { COLORS } from "src/constants/colors";
import EditIcon from "@assets/icons/inventory-list/edit-icon.svg";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import { parseStringifiedMetadata } from "./utils";
import { formatDate } from "src/helpers/formatDate";

export type DetailValues = { detail: string; value: string };

const DetailComponent = (props: {
  details: DetailValues;
  onPress?: () => void;
}) => {
  const { onPress, details } = props;
  const { detail, value } = details;
  return (
    <View>
      <Text variant="body2bold">{detail}</Text>
      <View style={styles.attributeContainer}>
        <View style={styles.attributeDetails}>
          <Text variant="body2regular">{value}</Text>
        </View>
        {onPress && (
          <TouchableOpacity onPress={() => onPress?.()}>
            <EditIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const AdminPeripheralDetailsScreen = () => {
  const route = useRoute<RouteProp<AdminNavParams, "peripheral-details">>();
  const { itemDetails } = route.params;
  const {
    metadata: _metadata,
    createdAt: _createdAt,
    categoryName,
    locationName,
    status,
  } = itemDetails;
  const metadata = parseStringifiedMetadata(_metadata);
  const createdAt = formatDate(_createdAt) as string;
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <DetailComponent
          details={{
            detail: "Category",
            value: categoryName,
          }}
        />
        <DetailComponent
          details={{
            detail: "Location",
            value: locationName,
          }}
          onPress={showUnderDevelopment}
        />
        <DetailComponent
          details={{
            detail: "Status",
            value: status,
          }}
          onPress={showUnderDevelopment}
        />
        {metadata?.map((details, index) => (
          <DetailComponent details={details} key={`detail-${index}`} />
        ))}
        <DetailComponent
          details={{
            detail: "Date Added",
            value: createdAt,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={showUnderDevelopment}>
            <DetailComponent
              details={{
                detail: "NFC",
                value: "Tap to Write Tag",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showUnderDevelopment}>
            <DetailComponent
              details={{
                detail: "QR Code",
                value: "Tap to create QR",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AdminPeripheralDetailsScreen;

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
