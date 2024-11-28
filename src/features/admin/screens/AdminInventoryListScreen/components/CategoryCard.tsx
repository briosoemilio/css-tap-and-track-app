import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "src/constants/colors";
import { parseCategoryName } from "../utils";
import Text from "src/components/Text";

const CategoryCard = (props: {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const { name, isSelected, onPress, disabled = false } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.categoryCard, isSelected && styles.selectedCategory]}
      disabled={disabled}
    >
      <Text variant="body2regular">{parseCategoryName(name)}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryCard: {
    paddingHorizontal: 18,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginRight: 12,
    borderRadius: 12,
  },
  selectedCategory: { backgroundColor: COLORS.blue },
});
