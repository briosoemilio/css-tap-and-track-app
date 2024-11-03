import { useNavigation } from "@react-navigation/native";
import { UnauthNavProps } from "./UnauthNavStack";

export const useUnauthNavigation = () => useNavigation<UnauthNavProps>();
