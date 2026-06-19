import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/admin/user");

  return response.data;
};
