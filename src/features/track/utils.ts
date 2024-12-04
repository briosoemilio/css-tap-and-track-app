import { ADMIN_ID } from "../admin/constants";

export const checkIfAdminCard = (tag: any) => {
  const { id } = tag;
  if (ADMIN_ID.includes(id)) {
    return true;
  }
  return false;
};
