import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAdminNavigation } from "./useAdminNavigation";
import BackIcon from "@assets/icons/back-icon.svg";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "src/constants/colors";

const AdminNavStackHeader = (props: { canGoBack: boolean }) => {
  const navigation = useAdminNavigation();
  return (
    <View>
      <StatusBar />
      <View
        style={{
          height: 100,
          backgroundColor: COLORS.black,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {props.canGoBack && (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ alignSelf: "flex-start", marginLeft: 25 }}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AdminNavStackHeader;

const styles = StyleSheet.create({});
