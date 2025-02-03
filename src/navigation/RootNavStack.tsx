import React from "react";
import { useAuth } from "../context/auth/useAuth";
import UnauthNavStack from "./UnauthNavigator/UnauthNavStack";
import AuthNavStack from "./AuthNavigator/AuthNavStack";
import AdminNavStack from "./AdminNavigator/AdminNavStack";
import { isEmpty } from "lodash";

const RootNavStack = () => {
  const { user, isAdmin } = useAuth();

  if (user === undefined) return <UnauthNavStack />;

  if (isAdmin === true) return <AdminNavStack />;

  return (
    <AuthNavStack
      initialRouteName={isEmpty(user.cardKey) ? "card-key-onboarding" : "main"}
    />
  );
};

export default RootNavStack;
