import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/auth/useAuth";
import UnauthNavStack from "./UnauthNavigator/UnauthNavStack";
import AuthNavStack from "./AuthNavigator/AuthNavStack";

const RootNavStack = () => {
  const { session } = useAuth();

  if (session === "") return <UnauthNavStack />;

  return <AuthNavStack />;
};

export default RootNavStack;
