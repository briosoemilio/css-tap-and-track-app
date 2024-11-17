import { createContext } from "react";
import { AuthContextType } from "./types";
import { UserModel } from "src/types/UserModel";

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isAdmin: false,
  onLogin: function (): void {
    // placeholder
  },
  onLogout: function (): void {
    // placeholder
  },
  updateUser: function (newUser: UserModel): void {
    // placeholder
  },
});
