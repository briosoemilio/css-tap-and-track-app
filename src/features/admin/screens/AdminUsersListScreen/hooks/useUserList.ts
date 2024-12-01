import React, { useEffect, useState } from "react";
import { getAllUsers } from "src/services/user/getAllUsers";
import { UserDetails } from "src/services/user/types";

export const useUserList = () => {
  const [usersList, setUsersList] = useState<UserDetails[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const loadUsers = async (nextPage: number) => {
    setIsLoading(true);
    try {
      const { data: newUsers } = await getAllUsers(nextPage);

      if (newUsers.length < 10) {
        setEndReached(true);
      }

      if (newUsers) {
        setUsersList((prev) => {
          const combined = [
            ...prev,
            ...newUsers.filter(
              (user) => !prev.some((i) => i.uuid === user.uuid)
            ),
          ];
          return combined;
        });
      }
    } catch (err) {
      console.log("Error loading users inside custom hook => ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    isLoading,
    endReached,
    usersList,
    loadMore,
  };
};
