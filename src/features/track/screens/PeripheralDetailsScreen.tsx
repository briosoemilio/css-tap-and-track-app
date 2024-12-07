import { ScrollView, StyleSheet, TextStyle, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TrackNavParams } from "../TrackNavigator";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import Text, { FontVariantKeys } from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import { getItemDetails } from "src/services/item/getItemDetails";
import { ItemDetails } from "src/services/item/types";
import { capitalize, upperCase } from "lodash";
import Button from "src/components/Button";
import { useTrackNavigation } from "../useTrackNavigation";
import { TagType } from "../types";
import { ComputerDetails } from "src/services/computer/types";
import { getComputerDetails } from "src/services/computer/getComputerDetails";

const PeripheralDetailsScreen = () => {
  const navigation = useTrackNavigation();
  const route = useRoute<RouteProp<TrackNavParams, "peripheral-details">>();
  const { id, tagType } = route.params;
  const [peripheralDetails, setPeripheralDetails] = useState<
    ItemDetails | ComputerDetails
  >();

  const loadData = async () => {
    try {
      switch (tagType) {
        case TagType.ITEM: {
          const itemDetails = await getItemDetails(id);
          setPeripheralDetails(itemDetails);
          break;
        }
        case TagType.COMPUTER: {
          const computerDetails = await getComputerDetails(id);
          setPeripheralDetails(computerDetails);
          break;
        }
      }
    } catch (err) {
      console.log("Error occurred : ", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Text
          variant="header2"
          textAlign="center"
          style={styles.peripheralDetected}
        >
          PERIPHERAL DETECTED
        </Text>
        {tagType === TagType.ITEM && (
          <ItemDetailsComponent
            itemDetails={peripheralDetails as ItemDetails}
          />
        )}
        {tagType === TagType.COMPUTER && (
          <ComputerDetailsComponent
            computerDetails={peripheralDetails as ComputerDetails}
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation?.goBack()} />
      </View>
    </ScreenContainer>
  );
};

const AttributeRow = (props: {
  variant: FontVariantKeys;
  attributeName: string;
  value: string;
  valueStyle?: TextStyle;
}) => {
  const { variant, attributeName, value, valueStyle } = props;
  return (
    <View style={styles.flexRow}>
      <Text variant={variant} style={styles.flex1}>
        {attributeName}:
      </Text>
      <Text variant={variant} style={[styles.flex1, valueStyle]}>
        {value}
      </Text>
    </View>
  );
};

const ItemDetailsComponent = (props: { itemDetails: ItemDetails }) => {
  const itemDetails = props.itemDetails;
  return (
    <View style={styles.detailsContainer}>
      <AttributeRow
        variant={"header3"}
        attributeName={"Type"}
        value={capitalize(itemDetails?.categoryName)}
      />
      <View style={{ marginTop: 24 }}>
        <AttributeRow
          variant={"body1bold"}
          attributeName={"Located at"}
          value={itemDetails?.locationName}
        />
        <AttributeRow
          variant={"body1bold"}
          attributeName={"Condition"}
          value={upperCase(itemDetails?.status)}
          valueStyle={
            itemDetails?.status === "AVAILABLE"
              ? { color: COLORS.green }
              : { color: COLORS.red }
          }
        />
        {itemDetails &&
          Object.entries(JSON.parse(itemDetails?.metadata)).map(
            ([attributeName, attributeValue], index) => (
              <AttributeRow
                key={index}
                variant={"body1bold"}
                attributeName={capitalize(attributeName)}
                value={attributeValue as string}
              />
            )
          )}
      </View>
    </View>
  );
};

const ComputerDetailsComponent = (props: {
  computerDetails: ComputerDetails;
}) => {
  const computerDetails = props.computerDetails;
  const otherComponents = computerDetails?.others || [];
  return (
    <View style={styles.detailsContainer}>
      <AttributeRow
        variant={"header3"}
        attributeName={"Type"}
        value={"Computer"}
      />
      <AttributeRow
        variant={"header3"}
        attributeName={"Name"}
        value={capitalize(computerDetails?.name)}
      />
      <View style={{ marginTop: 24 }}>
        <AttributeRow
          variant="body1bold"
          attributeName="Located at"
          value={computerDetails?.locationName}
        />
        <AttributeRow
          variant="body1bold"
          attributeName="Condition"
          value={upperCase(computerDetails?.status)}
          valueStyle={
            computerDetails?.status === "AVAILABLE"
              ? { color: COLORS.green }
              : { color: COLORS.red }
          }
        />
        <Text variant="header3" style={{ marginTop: 24 }}>
          COMPONENTS
        </Text>
        <AttributeRow
          variant={"body1bold"}
          attributeName={"Monitor"}
          value={upperCase(computerDetails?.monitorName)}
        />
        <AttributeRow
          variant={"body1bold"}
          attributeName={"Keyboard"}
          value={upperCase(computerDetails?.keyboardName)}
        />
        <AttributeRow
          variant={"body1bold"}
          attributeName={"Mouse"}
          value={upperCase(computerDetails?.mouseName)}
        />
        <AttributeRow
          variant={"body1bold"}
          attributeName={"System Unit"}
          value={upperCase(computerDetails?.systemUnitName)}
        />
        {otherComponents.length > 0 &&
          otherComponents.map((component, index) => (
            <AttributeRow
              key={index}
              variant="body1bold"
              attributeName="Other Components"
              value={component}
            />
          ))}
        {computerDetails?.metadata &&
          Object.entries(JSON.parse(computerDetails?.metadata)).map(
            ([attributeName, attributeValue], index) => (
              <AttributeRow
                key={index}
                variant="body1bold"
                attributeName={attributeName}
                value={attributeValue as string}
              />
            )
          )}
      </View>
    </View>
  );
};

export default PeripheralDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex1: { flex: 1 },
  peripheralDetected: { color: COLORS.red, marginBottom: 12 },
  detailsContainer: {
    backgroundColor: COLORS.gray,
    padding: 12,
    borderRadius: 12,
  },
});
