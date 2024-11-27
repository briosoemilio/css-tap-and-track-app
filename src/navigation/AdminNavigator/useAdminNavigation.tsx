import { useNavigation } from "@react-navigation/native";
import { AdminNavProps } from "./AdminNavStack";

export const useAdminNavigation = () => useNavigation<AdminNavProps>();
