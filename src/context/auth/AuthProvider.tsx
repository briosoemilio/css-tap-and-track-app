import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState("");

  const onLogin = () => {
    // do login
    setSession("test");
  };

  const onLogout = () => {
    // do logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        session,
        onLogin,
        onLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
