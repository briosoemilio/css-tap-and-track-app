import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAdminNavigation } from "./useAdminNavigation";
import BackIcon from "@assets/icons/back-icon.svg";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "src/constants/colors";
import Text from "src/components/Text";

const AdminNavStackHeader = (props: {
  canGoBack: boolean;
  routeName: string;
}) => {
  const navigation = useAdminNavigation();
  return (
    <View>
      <StatusBar />
      <View
        style={{
          height: 100,
          backgroundColor: COLORS.black,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "flex-end",
        }}
      >
        {props.canGoBack && (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ marginLeft: 25 }}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        {props.routeName === "inventory" && (
          <Text variant="header3" style={{ marginLeft: 25 }}>
            Inventory List
          </Text>
        )}
      </View>
    </View>
  );
};

export default AdminNavStackHeader;

const styles = StyleSheet.create({});
