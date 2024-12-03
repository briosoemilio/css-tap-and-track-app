export const getDevicePropertyName = (device: string) => {
  const deviceMap: { [key: string]: string } = {
    MOUSE: "mouseName",
    KEYBOARD: "keyboardName",
    MONITOR: "monitorName",
    SYSTEM_UNIT: "systemUnitName",
  };

  const propertyName = deviceMap[device] || "others";

  return propertyName as PropertyName;
};

type PropertyName =
  | "monitorName"
  | "keyboardName"
  | "mouseName"
  | "systemUnitName"
  | "locationName"
  | "others";
