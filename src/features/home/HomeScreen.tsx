import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "src/context/auth/useAuth";
import ScreenContainer from "src/components/ScreenContainer";
import Button from "src/components/Button";

const HomeScreen = () => {
  const { onLogout } = useAuth();
  return (
    <ScreenContainer>
      <Button title="logout" onPress={() => onLogout()} />
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
