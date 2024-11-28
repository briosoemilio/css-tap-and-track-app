import React, { useEffect, useState } from "react";
import { getAllLocations } from "src/services/location/getAllLocations";
import { LocationDetails } from "src/services/location/types";

export const useLocationList = () => {
  const [locationList, setLocationList] = useState<LocationDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLocations = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllLocations();
      const all = { name: "ALL" } as LocationDetails;
      setLocationList([all, ...data]);
    } catch (err) {
      console.log("Error loadLocations invoke inside hooks -> ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return {
    locationList,
    isLoading,
    loadLocations,
  };
};
