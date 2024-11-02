import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    return context;
  } catch (err) {
    console.log("[ERROR] Auth Context initialization fail : ", err);
    throw new Error(JSON.stringify(err));
  }
};
