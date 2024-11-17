import { ComputerDetails } from "src/services/computer/types";

export const getComputerPeripherals = (computerDetails: ComputerDetails) => {
  const { monitorName, keyboardName, mouseName, systemUnitName, others } =
    computerDetails as ComputerDetails;
  const components = [
    monitorName,
    keyboardName,
    mouseName,
    systemUnitName,
    ...others,
  ];

  return components.map((component, index) => {
    return {
      id: index,
      label: component,
      value: component,
    };
  });
};
