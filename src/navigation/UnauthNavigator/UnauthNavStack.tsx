import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth/useAuth";

const UnauthNavStack = () => {
  const { onLogin } = useAuth();
  return (
    <View
      style={{
        height: 300,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>UnauthNavStack</Text>
      <Button title="login" onPress={onLogin} />
    </View>
  );
};

export default UnauthNavStack;

const styles = StyleSheet.create({});
