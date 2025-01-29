import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { ComputerDetails } from "src/services/computer/types";
import { formatDate } from "src/helpers/formatDate";
import ArchiveImage from "assets/png/archived-png.png";

const ComputerCard = (props: {
  computerDetails: ComputerDetails;
  onPress: () => void;
}) => {
  const { computerDetails, onPress } = props;
  const { name, locationName, status, createdAt, isArchived } = computerDetails;
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
        <Text variant="body2bold">{name}</Text>
        <Text variant="body3regular">{locationName}</Text>
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Created At:
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ComputerCard;

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
