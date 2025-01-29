import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { ItemStatus } from "src/types/ItemStatus";
import { ItemDetails } from "src/services/item/types";
import ArchiveImage from "assets/png/archived-png.png";

const ItemCard = (props: { itemDetails: ItemDetails; onPress: () => void }) => {
  const { itemDetails, onPress } = props;
  const { name, locationName, categoryName, status, isArchived } = itemDetails;
  return (
    <TouchableOpacity
      style={[
        styles.itemCard,
        isArchived && { backgroundColor: COLORS.white50 },
      ]}
      onPress={onPress}
    >
      {isArchived && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={ArchiveImage}
            style={{ height: 80, marginTop: 10, marginLeft: 40 }}
            resizeMode="contain"
          />
        </View>
      )}
      <View>
        <Text variant="body2bold">Name: {name}</Text>
        <Text variant="body3regular">Location: {locationName}</Text>
      </View>
      <View>
        <Text variant="body3regular" textAlign="right">
          {categoryName}
        </Text>
        <Text
          variant="body3regular"
          textAlign="right"
          style={
            status === ItemStatus.UNDER_MAINTENANCE
              ? { color: COLORS.red }
              : { color: COLORS.green }
          }
        >
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  itemCard: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginBottom: 12,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
