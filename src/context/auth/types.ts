import { UserModel } from "../../types/UserModel";

export type AuthContextType = {
  user?: UserModel;
  session: string;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
};
