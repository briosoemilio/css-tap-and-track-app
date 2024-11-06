import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TrackNavParams } from "../TrackNavigator";
import { CONSTANTS } from "src/constants/constants";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import { getItemDetails } from "src/services/item/getItemDetails";
import { ItemDetails } from "src/services/item/types";
import { capitalize, upperCase } from "lodash";
import Button from "src/components/Button";
import { useTrackNavigation } from "../useTrackNavigation";

const PeripheralDetailsScreen = () => {
  const navigation = useTrackNavigation();
  const route = useRoute<RouteProp<TrackNavParams, "peripheral-details">>();
  const { id, type } = route.params;
  const [itemDetails, setItemDetails] = useState<ItemDetails>();

  const loadData = async () => {
    try {
      const _itemDetails = await getItemDetails(id);
      setItemDetails(_itemDetails);
    } catch (err) {
      console.log("Error occurred : ", err);
    }
  };

  console.log({ itemDetails });

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
          style={{ color: COLORS.red, marginBottom: 12 }}
        >
          PERIPHERAL DETECTED
        </Text>
        <View
          style={{
            backgroundColor: COLORS.gray,
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Text variant="header3">
            Type: {capitalize(itemDetails?.categoryName)}
          </Text>
          <View style={{ marginTop: 24 }}>
            <Text variant="body1bold">
              Located at: {itemDetails?.locationName}
            </Text>
            <Text variant="body1bold">
              Condition:{" "}
              <Text variant="body1bold" style={{ color: COLORS.green }}>
                {upperCase(itemDetails?.status)}
              </Text>
            </Text>
            {itemDetails &&
              Object.entries(JSON.parse(itemDetails?.metadata)).map(
                ([attributeName, attributeValue]) => (
                  <Text variant="body1bold" key={attributeName}>
                    {capitalize(attributeName)}: {attributeValue as string}
                  </Text>
                )
              )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation?.goBack()} />
      </View>
    </ScreenContainer>
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
});
