const VERSION = "1.0.0";

export default () => {
  return {
    expo: {
      name: "CCS Tap and Track",
      slug: "ccs-tap-and-track",
      scheme: "ccstapandtrack",
      version: VERSION,
      owner: "elmo",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "dark",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#121417",
      },
      assetBundlePatterns: ["**/*"],
      platforms: ["ios", "android"],
      ios: {
        bundleIdentifier: "com.ccs.ccstapandtrack",
        buildNumber: "1.0.0",
      },
      android: {
        package: "com.ccs.ccstapandtrack",
        versionCode: 1,
      },
      plugins: [
        [
          "expo-build-properties",
          {
            android: {
              usesCleartextTraffic: true,
            },
          },
        ],
        [
          "react-native-nfc-manager",
          {
            nfcPermission: "Custom permission message",
            selectIdentifiers: ["A0000002471001"],
            systemCodes: ["8008"],
            includeNdefEntitlement: false,
          },
        ],
      ],
      extra: {
        eas: {
          projectId: "a0905f90-bd80-47e7-8e6c-9a18da272ac4",
        },
        apiUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
      },
    },
  };
};
