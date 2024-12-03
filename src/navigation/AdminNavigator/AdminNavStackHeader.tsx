import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useAdminNavigation } from "./useAdminNavigation";
import BackIcon from "@assets/icons/back-icon.svg";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";

const AdminNavStackHeader = (props: {
  canGoBack: boolean;
  routeName: string;
  params?: any;
}) => {
  // Props
  const { canGoBack, routeName, params } = props;

  // nav hooks
  const navigation = useAdminNavigation();

  // react hooks
  const headerName = useMemo(() => {
    switch (routeName) {
      case "inventory": {
        return "Inventory List";
      }
      case "inventory-creator": {
        return "Create Peripheral";
      }
      case "peripheral-details": {
        return params?.itemDetails?.name;
      }
      case "add-location": {
        return "Location List";
      }
      case "reports": {
        return "Report List";
      }
      case "users": {
        return "User List";
      }
      case "computers": {
        return "Computer List";
      }
      case "computer-details": {
        return params?.computerDetails?.name;
      }
      case "computer-logs": {
        return "Computer Logs List";
      }
      case "computer-logs-details": {
        return "Log Details";
      }
      case "computer-creator": {
        return "Create Computer";
      }
      case "computer-peripheral-select": {
        return "Select Peripheral";
      }
      case "add-category": {
        return "Category List";
      }
      default: {
        return "";
      }
    }
  }, [routeName]);
  return (
    <View>
      <View
        style={{
          height: 50,
          backgroundColor: COLORS.black,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "flex-end",
        }}
      >
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ marginLeft: 25 }}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        {headerName && (
          <Text variant="header3" style={{ marginLeft: 25 }}>
            {headerName}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AdminNavStackHeader;

const styles = StyleSheet.create({});
