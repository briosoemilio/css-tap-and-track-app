// Libe
import React, { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// components
import Text from "src/components/Text";
import Loader from "src/components/Loader";
import UserReportCard from "./UserReportCard";

// constants
import { COLORS } from "src/constants/colors";
import { CONSTANTS } from "src/constants/constants";

// utils
import { UserDetails } from "src/services/user/types";
import { formatDate } from "src/helpers/formatDate";
import { AdminReportCardInfo } from "../../AdminReportsScreen/components/AdminReportCard";

interface AddLocationBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  onClose?: () => void;
  userDetails: UserDetails;
  isLoading: boolean;
  parsedList: AdminReportCardInfo[];
}

const ReportList = (props: {
  parsedList: AdminReportCardInfo[];
  isLoading: boolean;
}) => {
  const { parsedList, isLoading } = props;

  if (isLoading) {
    return <Loader />;
  }

  if (parsedList?.length === 0) {
    return (
      <Text variant="body2regular" style={{ marginTop: -12 }}>
        User has no reports yet.
      </Text>
    );
  }

  return (
    <View style={{ gap: 12, justifyContent: "space-between" }}>
      <UserReportCard reportDetails={parsedList[0]} />
      {parsedList?.length > 1 && (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            padding: 12,
            borderColor: COLORS.white,
            borderWidth: 3,
            borderRadius: 12,
          }}
        >
          <Text variant="body2bold">See More Reports</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ViewUserDetailsBottomSheet = (props: AddLocationBottomSheetProps) => {
  // props
  const { bottomSheetRef, onClose, userDetails, isLoading, parsedList } = props;
  const {
    name = "",
    yearSection = "",
    idNumber = "",
    email = "",
    createdAt = new Date(),
  } = userDetails ?? {};

  // functions
  const onSheetChange = useCallback(
    async (index: number) => {
      if (index === -1 && onClose) {
        onClose?.();
      }
    },
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={(index: number) => onSheetChange(index)}
      enablePanDownToClose={true}
      enableOverDrag={false}
      backgroundStyle={{ backgroundColor: COLORS.darkBlue }}
      index={-1}
      snapPoints={["60%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text variant="header3" textAlign="left">
            {name}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.rowContainer}>
            <View>
              <Text variant="body2bold">Email:</Text>
              <Text variant="body2regular">{email}</Text>
            </View>
            <View>
              <Text variant="body2bold">ID Number:</Text>
              <Text variant="body2regular">{idNumber}</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View>
              <Text variant="body2bold">Year Section:</Text>
              <Text variant="body2regular">{yearSection}</Text>
            </View>
            <View>
              <Text variant="body2bold">Created At:</Text>
              <Text variant="body2regular">{formatDate(createdAt)}</Text>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <Text variant="body2bold">Reports</Text>
            <ReportList parsedList={parsedList} isLoading={isLoading} />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ViewUserDetailsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    padding: CONSTANTS.layout,
    flexGrow: 1,
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  detailsContainer: {
    display: "flex",
    gap: 12,
    marginTop: 12,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
