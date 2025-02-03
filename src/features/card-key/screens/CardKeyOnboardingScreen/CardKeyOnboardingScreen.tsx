import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import ScreenContainer from "src/components/ScreenContainer";
import PagerView from "react-native-pager-view";
import CardKeyLottie from "@assets/animation/card-key-lottie.json";
import LottieView from "lottie-react-native";
import NFCLoginLottie from "@assets/animation/nfc-login-lottie.json";
import AdminKeyLottie from "@assets/animation/admin-key-lottie.json";
import GetStartedLottie from "@assets/animation/get-started-lottie.json";
import { COLORS } from "src/constants/colors";
import Button from "src/components/Button";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";

const CardKeyOnboardingScreen = () => {
  const [position, setPosition] = useState(0);
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <PagerView
          style={styles.container}
          initialPage={0}
          onPageSelected={(e) => setPosition(e.nativeEvent.position)}
        >
          <View style={styles.page}>
            <FirstPage />
          </View>
          <View style={styles.page}>
            <SecondPage />
          </View>
          <View style={styles.page}>
            <ThirdPage />
          </View>
          <View style={styles.page}>
            <FourthPage />
          </View>
        </PagerView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Pagination position={position} isSelected={position === 0} />
          <Pagination position={position} isSelected={position === 1} />
          <Pagination position={position} isSelected={position === 2} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const FirstPage = () => {
  return (
    <View style={styles.page} key="1">
      <Text>It seems that you haven't connected a card key yet.</Text>
      <LottieView source={CardKeyLottie} style={styles.height} autoPlay loop />
    </View>
  );
};

const SecondPage = () => {
  return (
    <View style={styles.page} key="2">
      <Text>
        {`If your device is NFC-compatible, you can assign a card key that can be used for logging in.`}
      </Text>
      <LottieView
        source={NFCLoginLottie}
        style={styles.height}
        autoPlay
        loop
        speed={0.5}
      />
    </View>
  );
};

const ThirdPage = () => {
  return (
    <View style={styles.page} key="3">
      <Text>
        Only one keycard is allowed per account. If you lost your keycard have
        your Administrator provide you a new one.
      </Text>
      <LottieView
        source={AdminKeyLottie}
        style={styles.height}
        autoPlay
        loop
        speed={0.5}
      />
      <Text variant="body3regular">{`Swipe once more ->`}</Text>
    </View>
  );
};

const FourthPage = () => {
  const navigation = useAuthNavigation();
  const goToHome = () =>
    navigation?.reset({
      index: 0,
      routes: [{ name: "main" }],
    });

  const goToLink = () =>
    navigation?.reset({
      index: 0,
      routes: [{ name: "card-key-link" }],
    });

  return (
    <View style={{ width: "100%", height: "100%" }} key="4">
      <View style={{ marginTop: 60, alignItems: "center" }}>
        <Text variant="header2" style={{ marginBottom: 24 }}>
          Let's Get Started
        </Text>
        <LottieView
          source={GetStartedLottie}
          style={styles.height}
          autoPlay
          loop
        />
      </View>
      <View style={{ flex: 1 }} />
      <Button
        title="Link Card Key"
        style={{ marginBottom: 12, backgroundColor: COLORS.green }}
        onPress={goToLink}
      />
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
};

const Pagination = (props: { position: number; isSelected: boolean }) => {
  const { position, isSelected } = props;
  if (position === 3) return null;
  return (
    <View
      style={{
        width: isSelected ? 30 : 12,
        height: 12,
        backgroundColor: isSelected ? COLORS.white : COLORS.gray,
        borderRadius: 15,
      }}
    />
  );
};

export default CardKeyOnboardingScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  height: { height: 300, width: 300 },
});
