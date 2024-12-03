import React, { useEffect, useState } from "react";
import { getComputerDetails } from "src/services/computer/getComputerDetails";
import { ComputerDetails } from "src/services/computer/types";

export const useGetComputerDetails = (identifier: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [computerDetails, setComputerDetails] = useState<ComputerDetails>();

  const loadComputerDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getComputerDetails(identifier);
      if (res) {
        setComputerDetails(res);
      }
    } catch (err) {
      console.log("Error loading computer details -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComputerDetails();
  }, [identifier]);

  return {
    isLoading,
    computerDetails,
    loadComputerDetails,
  };
};
