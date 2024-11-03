import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "src/lib/storage/storage";
import { decodeToken } from "src/lib/jwt/decodeToken";
import { UserModel } from "src/types/UserModel";
import { Role } from "src/types/Role";
import { Session } from "src/lib/session/types";

export const AuthProvider = (props: { children: React.ReactNode }) => {
  // Hooks
  const [user, setUser] = useState<UserModel>();
  const [isAdmin, setIsAdmin] = useState(false);

  // Functions
  const decodeTokenAndSetUser = (token: string) => {
    const decodedToken = decodeToken(token) as UserModel;
    setUser(decodedToken);
    if (decodedToken.role === Role.ADMIN) {
      setIsAdmin(true);
    }
  };

  const onAppOpen = async () => {
    const session = (await AsyncStorage.getItem("session")) as Session;
    const token = session.token;
    decodeTokenAndSetUser(token);
  };

  useEffect(() => {
    onAppOpen();
  }, []);

  const onLogin = async (res: any) => {
    const { token } = res;
    const newSession = {
      token,
    };
    await AsyncStorage.setItem("session", newSession);
    decodeTokenAndSetUser(token);
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
