import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";

type OptionCardProps = {
  optionText: string;
  isSelected: boolean;
  onPress: () => void;
};

const OptionCard = (props: OptionCardProps) => {
  const { optionText, isSelected, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.optionCard, isSelected && styles.selectedCategory]}
    >
      <Text variant="body2regular">{optionText}</Text>
    </TouchableOpacity>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  optionCard: {
    paddingHorizontal: 18,
    borderColor: COLORS.blue,
    borderWidth: 3,
    marginRight: 12,
    borderRadius: 12,
  },
  selectedCategory: { backgroundColor: COLORS.blue },
});
