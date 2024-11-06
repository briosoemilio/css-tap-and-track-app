// app.config.js

export default ({ config }) => {
  return {
    ...config,
    expo: {
      plugins: [
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
    },
    name: "CCS Tap and Track",
    slug: "ccs-tap-and-track",
    version: "1.0.0",
    platforms: ["ios", "android"],
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
    android: {
      package: "com.ccs.ccstapandtrack",
      versionCode: 1,
    },
    ios: {
      bundleIdentifier: "com.ccs.ccstapandtrack",
      buildNumber: "1.0.0",
    },
    extra: {
      eas: {
        projectId: "a0905f90-bd80-47e7-8e6c-9a18da272ac4",
      },
      apiUrl:
        process.env.EXPO_PUBLIC_API_BASE_URL || "http://47.129.31.141:3000",
    },
  };
};
