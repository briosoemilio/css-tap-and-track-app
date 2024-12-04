import { checkAdmin } from "src/services/login/checkAdmin";

export const checkIfAdminCard = async (tag: any) => {
  const { id } = tag;
  const { isAdmin } = await checkAdmin(id);
  return isAdmin;
};
