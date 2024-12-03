import { useEffect, useState } from "react";
import { getComputerLogDetails } from "src/services/computer-logs/getComputerLogDetails";
import { ComputerLogDetails } from "src/services/computer-logs/types";

export const useGetComputerLogDetails = (identifier: string) => {
  const [computerLogDetails, setComputerLogDetails] =
    useState<ComputerLogDetails>();
  const [lastUsedBy, setLastUsedBy] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const loadDetails = async () => {
    try {
      setIsLoading(true);
      const res = await getComputerLogDetails(identifier);
      if (res) {
        setComputerLogDetails(res);
      }
    } catch (err) {
      console.log("Error loading computer log details -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return { computerLogDetails, isLoading, loadDetails };
};
