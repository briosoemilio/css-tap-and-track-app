import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "./AuthNavStack";

export const useAuthNavigation = () => useNavigation<AuthNavProps>();
