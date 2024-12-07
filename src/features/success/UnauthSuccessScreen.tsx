import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import { RouteProp, useRoute } from "@react-navigation/native";
import Button from "src/components/Button";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import GreenCheck from "@assets/png/green-check.png";
import { UnauthNavParams } from "src/navigation/UnauthNavigator/UnauthNavStack";
import { useUnauthNavigation } from "src/navigation/UnauthNavigator/useUnauthNavigation";

const UnauthSuccessScreen = () => {
  const route = useRoute<RouteProp<UnauthNavParams, "success">>();
  const message = route.params?.message;
  const navigation = useUnauthNavigation();
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          source={GreenCheck}
          style={{ width: 93, height: 85, marginVertical: 24 }}
        />
        <Text variant="header2">SUCCESS</Text>
        <Text textAlign="center">{message}</Text>
      </ScrollView>
      <View style={styles.backButtonContainer}>
        <Button
          title="Back To Home"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            })
          }
        />
      </View>
    </ScreenContainer>
  );
};

export default UnauthSuccessScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: { paddingHorizontal: CONSTANTS.layout },
});
