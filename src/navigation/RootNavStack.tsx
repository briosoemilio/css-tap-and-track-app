import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/auth/useAuth";
import UnauthNavStack from "./UnauthNavigator/UnauthNavStack";
import AuthNavStack from "./AuthNavigator/AuthNavStack";
import AdminNavStack from "./AdminNavigator/AdminNavStack";

const RootNavStack = () => {
  const { user, isAdmin } = useAuth();

  if (user === undefined) return <UnauthNavStack />;

  if (isAdmin === true) return <AdminNavStack />;

  return <AuthNavStack />;
};

export default RootNavStack;
