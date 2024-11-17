import { UserModel } from "../../types/UserModel";

export type AuthContextType = {
  user?: UserModel;
  isAdmin: boolean;
  onLogin: (res: any) => void;
  onLogout: () => void;
  updateUser: (newUser: UserModel) => void;
};
