import { useState } from "react";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "src/lib/storage/storage";
import { decodeToken } from "src/lib/jwt/decodeToken";
import { UserModel } from "src/types/UserModel";
import { Role } from "src/types/Role";

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserModel>();
  const [isAdmin, setIsAdmin] = useState(false);

  const onLogin = async (res: any) => {
    const { token } = res;
    const newSession = {
      token,
    };
    await AsyncStorage.setItem("session", newSession);
    const decodedToken = decodeToken(token) as UserModel;
    setUser(decodedToken);
    if (decodedToken.role === Role.ADMIN) {
      setIsAdmin(true);
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("session");
    setUser(undefined);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        onLogin,
        onLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
