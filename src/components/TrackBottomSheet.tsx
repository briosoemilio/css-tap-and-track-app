import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { COLORS } from "src/constants/colors";
import Text from "./Text";
import NFCTrackAnimation from "@assets/animation/nfc-lottie.json";

interface TrackBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onOpen: () => Promise<void>;
}

const TrackBottomSheet = (props: TrackBottomSheetProps) => {
  const { bottomSheetRef, onOpen } = props;

  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === 0 && onOpen) {
        await onOpen(); // Call `onOpen` when the bottom sheet is opened
      }
    },
    [onOpen]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={(index: number) => onSheetChange(index)}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backgroundStyle={{ backgroundColor: COLORS.darkBlue }}
      index={-1}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text variant="header3" textAlign="center">
          Place phone over NFC tag
        </Text>
        <LottieView
          style={{ height: 300, width: 300 }}
          source={NFCTrackAnimation}
          autoPlay
          loop
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
});

export default TrackBottomSheet;
