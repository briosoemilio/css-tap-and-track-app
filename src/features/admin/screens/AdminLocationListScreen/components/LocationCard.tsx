import { StyleSheet, View } from "react-native";
import React from "react";
import { LocationDetails } from "src/services/location/types";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";

const LocationCard = (props: { location: LocationDetails }) => {
  const { location } = props;
  return (
    <View style={styles.locationCard}>
      <View>
        <Text variant="body1bold">{location.name}</Text>
        <Text variant="body3regular">{location.floor}</Text>
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Created At:
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(location.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  locationCard: {
    padding: 15,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    borderRadius: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
