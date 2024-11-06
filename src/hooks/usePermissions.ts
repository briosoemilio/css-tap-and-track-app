import React, { useEffect, useState } from "react";
import { Alert, Linking, PermissionsAndroid } from "react-native";

const usePermissions = () => {
  // Permissions
  const wifiPermission = PermissionsAndroid.PERMISSIONS.WIFI;
  const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
  const nfcPermission = PermissionsAndroid.PERMISSIONS.NFC;

  const [isCameraAllowed, setCamAllowed] = useState(false);
  const [isWifiAllowed, setIsWifiAllowed] = useState(false);
  const [isNFCAllowed, setIsNFCAllowed] = useState(false);

  const askCameraPermissions = async () => {
    const check = await PermissionsAndroid.check(cameraPermission);
    if (check === true) return;
    await PermissionsAndroid.request(cameraPermission, {
      title: "Camera Access Required",
      message: "This app needs camera access to continue",
      buttonPositive: "ALLOW",
    }).then((res) => {
      if (res === "granted") setCamAllowed(true);
      if (res === "never_ask_again") handleNeverAskAgain();
    });
  };

  const askNFCPermissions = async () => {
    const check = await PermissionsAndroid.check(nfcPermission);
    if (check === true) return;
    PermissionsAndroid.request(nfcPermission, {
      title: "NFC Access Required",
      message: "This app needs NFC access to continue",
      buttonPositive: "ALLOW",
    }).then((res) => {
      if (res === "granted") setIsNFCAllowed(true);
      if (res === "never_ask_again") handleNeverAskAgain();
    });
  };

  const askWIFIPermissions = async () => {
    const check = await PermissionsAndroid.check(wifiPermission);
    if (check === true) return;
    PermissionsAndroid.request(wifiPermission, {
      title: "WIFI Access Required",
      message: "This app needs WIFI access to continue",
      buttonPositive: "ALLOW",
    }).then((res) => {
      if (res === "granted") setIsWifiAllowed(true);
      if (res === "never_ask_again") handleNeverAskAgain();
    });
  };

  const handleNeverAskAgain = () => {
    Alert.alert(
      "PERMISSION REQUIRED",
      "Device permission is required for you to use the app. Press ok to open settings",
      [{ text: "Ok", onPress: () => Linking.openSettings() }]
    );
  };

  const checkPermissions = async () => {
    PermissionsAndroid.check(cameraPermission).then((res) =>
      setCamAllowed(res)
    );
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    isCameraAllowed,
    askCameraPermissions,
    isWifiAllowed,
    askWIFIPermissions,
    isNFCAllowed,
    askNFCPermissions,
  };
};

export default usePermissions;
