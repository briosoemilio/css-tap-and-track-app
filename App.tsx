import { StyleSheet, Text, View } from "react-native";
import RootNavStack from "./src/navigation/RootNavStack";
import { AuthProvider } from "./src/context/auth/AuthProvider";
import NavContainer from "./src/navigation/NavContainer";
import { useFonts } from "@assets/fonts/useFonts";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded, fontError] = useFonts();

  useEffect(() => {
    onLayoutRootView();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavContainer>
      <AuthProvider>
        <GestureHandlerRootView>
          <RootNavStack />
        </GestureHandlerRootView>
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
