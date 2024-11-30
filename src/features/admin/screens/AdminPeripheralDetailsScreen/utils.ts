import { DetailValues } from "./AdminPeripheralDetailsScreen";

export const parseStringifiedMetadata = (metadata: string): DetailValues[] => {
  try {
    const obj = JSON.parse(metadata) as Record<string, string>;
    return Object.entries(obj).map(([detail, value]) => ({
      detail,
      value,
    }));
  } catch (error) {
    console.error("Invalid JSON format", error);
    return [];
  }
};
