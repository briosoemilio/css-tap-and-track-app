import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavStack from "./src/navigation/RootNavStack";
import { AuthProvider } from "./src/context/auth/AuthProvider";
import NavContainer from "./src/navigation/NavContainer";

export default function App() {
  return (
    <NavContainer>
      <AuthProvider>
        <RootNavStack />
      </AuthProvider>
    </NavContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
