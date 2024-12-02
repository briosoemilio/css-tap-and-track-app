import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Text from "src/components/Text";
import Loader from "src/components/Loader";
import { COLORS } from "src/constants/colors";

const ListFooter = (props: {
  showFooter: boolean;
  showLoader: boolean;
  onPress: () => void;
}) => {
  const { showFooter, showLoader, onPress } = props;
  return (
    <View>
      {showFooter && (
        <TouchableOpacity onPress={onPress} style={styles.loadMore}>
          <Text variant="body2bold">Load More</Text>
        </TouchableOpacity>
      )}
      {showLoader && <Loader size={"large"} />}
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  loadMore: {
    paddingVertical: 8,
    backgroundColor: COLORS.blue,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
