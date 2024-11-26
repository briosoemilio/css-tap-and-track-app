import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { useTrackNavigation } from "../useTrackNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TrackNavParams } from "../TrackNavigator";
import {
  CameraView,
  PermissionResponse,
  useCameraPermissions,
} from "expo-camera";
import { TagType, TrackType } from "../types";
import { useAuthNavigation } from "src/navigation/AuthNavigator/useAuthNavigation";
import ItemModal from "../components/ItemModal";

const NoPermissionComponent = (props: {
  requestPermission: () => Promise<PermissionResponse>;
}) => {
  return (
    <View style={styles.iconTextContainer}>
      <View style={{ width: 250, marginRight: 24 }}>
        <Text textAlign="center" variant="body2regular">
          We need you to allow camera permissions to use this feature.
        </Text>
        <Button title="Allow Camera" onPress={props.requestPermission} />
      </View>
    </View>
  );
};

const CameraComponent = (props: {
  onBarcodeScanned: (data: string) => void;
}) => {
  const { onBarcodeScanned } = props;
  return (
    <View style={{ height: 400 }}>
      <Text
        textAlign="center"
        variant="body2regular"
        style={{ marginBottom: 12 }}
      >
        Place the QR code inside the box
      </Text>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={{ flex: 1, width: "100%" }}
        facing="back"
        onBarcodeScanned={({ data }) => onBarcodeScanned(data)}
      />
    </View>
  );
};

const QRTrackScreen = () => {
  // nav hooks
  const navigation = useTrackNavigation();
  const authNavigation = useAuthNavigation();

  // route
  const route = useRoute<RouteProp<TrackNavParams, "qr">>();
  const { trackType } = route.params;

  // camera hooks
  const [permission, requestPermission] = useCameraPermissions();

  // react hooks
  const [showModal, setShowModal] = useState(false);
  const [tagDetails, setTagDetails] = useState<{ id: number; type: TagType }>();

  const peripheralDetected = (data: string) => {
    let parsedData;

    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      Alert.alert(
        "Invalid Data",
        "The scanned data is not a valid QR code or JSON format."
      );
      return;
    }

    const id = parsedData?.id;
    const tagType = parsedData?.type;

    switch (trackType) {
      case TrackType.COMPUTER_LOG: {
        if (tagType === TagType.COMPUTER) {
          authNavigation.navigate("time-in", { computerId: id });
          break;
        }

        if (tagType === TagType.ITEM) {
          setTagDetails({ id, type: tagType });
          setShowModal(true);
          break;
        }
      }
      case TrackType.ITEM_DETAILS: {
        navigation.navigate("peripheral-details", { id, tagType });
        break;
      }
      case TrackType.CREATE_REPORT: {
        authNavigation.navigate("report", { id, tagType });
        break;
      }
      default: {
        Alert.alert(
          "Incorrect QR Code",
          "Make sure the QR Code pertains to a peripheral"
        );
      }
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {permission?.granted ? (
          <CameraComponent onBarcodeScanned={peripheralDetected} />
        ) : (
          <NoPermissionComponent requestPermission={requestPermission} />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>

      <ItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPressYes={() =>
          navigation.navigate("peripheral-details", {
            id: tagDetails?.id as number,
            tagType: tagDetails?.type as TagType,
          })
        }
      />
    </ScreenContainer>
  );
};

export default QRTrackScreen;

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: CONSTANTS.layout },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 80,
  },
  buttonContainer: { paddingHorizontal: CONSTANTS.layout },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
