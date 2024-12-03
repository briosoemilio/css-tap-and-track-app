import { useEffect, useState } from "react";
import { getUserDetails } from "src/services/user/getUserDetails";
import { UserDetails } from "src/services/user/types";

export const useGetUserDetails = (identifier: string | number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const loadUserDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getUserDetails(identifier);
      if (res) {
        setUserDetails(res);
      }
    } catch (err) {
      console.log("Error getting user details -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, [identifier]);

  return {
    isLoading,
    userDetails,
    loadUserDetails,
  };
};
