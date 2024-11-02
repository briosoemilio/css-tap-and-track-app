import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  const [fontsLoaded, fontError] = useExpoFonts({
    "Instrument-Serif": require("./instrument/InstrumentSerif-Regular.ttf"),
    "Instrument-Serif-Italic": require("./instrument/InstrumentSerif-Italic.ttf"),
    "Inter-Black": require("./inter/Inter-Bold.ttf"),
    "Inter-Bold": require("./inter/Inter-ExtraBold.ttf"),
    "Inter-ExtraBold": require("./inter/Inter-ExtraLight.ttf"),
    "Inter-ExtraLight": require("./inter/Inter-Light.ttf"),
    "Inter-Light": require("./inter/Inter-Medium.ttf"),
    "Inter-Regular": require("./inter/Inter-Regular.ttf"),
    "Inter-Medium": require("./inter/Inter-SemiBold.ttf"),
    "Inter-SemiBold": require("./inter/Inter-Thin.ttf"),
  });

  return [fontsLoaded, fontError];
};
