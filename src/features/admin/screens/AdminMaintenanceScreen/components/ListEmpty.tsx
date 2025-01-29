import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import EmptyInventoryLottie from "@assets/animation/empty-inventory-lottie.json";
import Text from "src/components/Text";

const ListEmpty = () => {
  return (
    <View>
      <LottieView
        source={EmptyInventoryLottie}
        style={styles.height}
        autoPlay
        loop
      />
      <Text variant="header3" textAlign="center">
        Sorry there are no computers yet.
      </Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  height: { height: 300 },
});
