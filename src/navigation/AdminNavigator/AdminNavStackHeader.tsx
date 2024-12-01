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
