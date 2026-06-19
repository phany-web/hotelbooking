import api from "./axios";

export const getAllAdmins = async () => {
  const response = await api.get("/admin/all-admins");
  return response.data.data;
};

export const disableAdmin = async (id: string) => {
  const response = await api.patch(`/admin/disable/${id}`);
  return response.data;
};

export const enableAdmin = async (id: string) => {
  const response = await api.patch(`/admin/enable/${id}`);
  return response.data;
};

export const createAdmin = async (data: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const response = await api.post("/admin/create-admin", data);

  return response.data;
};
