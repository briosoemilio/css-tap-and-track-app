import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { AuthNavParams } from "./AuthNavigator/AuthNavParams";

const Container = NavigationContainer<AuthNavParams>;

const NavContainer = (props: {
  children: ReactNode;
  onReady?: (() => void) | undefined;
}) => {
    
  const linkingOptions: LinkingOptions<AuthNavParams> = {
    prefixes: [],
  };

  return (
    <Container linking={linkingOptions} onReady={props.onReady}>
      {props.children}
    </Container>
  );
};

export default NavContainer;

const styles = StyleSheet.create({});
