import { createContext } from "react";
import { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  session: "",
  isAdmin: false,
  onLogin: function (): void {
    // placeholder
  },
  onLogout: function (): void {
    // placeholder
  },
});
