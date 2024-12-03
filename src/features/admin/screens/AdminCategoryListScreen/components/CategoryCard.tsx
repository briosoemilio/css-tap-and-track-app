import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";
import { CategoryData } from "src/services/category/types";

const CategoryCard = (props: { categoryDetails: CategoryData }) => {
  const { categoryDetails } = props;
  return (
    <View style={styles.locationCard}>
      <View>
        <Text variant="body1bold">{categoryDetails.name}</Text>
      </View>
      <View>
        <Text variant="body3bold" textAlign="right">
          Created At:
        </Text>
        <Text variant="body3regular" textAlign="right">
          {formatDate(categoryDetails.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default CategoryCard;

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
