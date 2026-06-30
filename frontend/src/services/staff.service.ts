import api from "./axios";

export const getStaffs = async () => {
  const res = await api.get("/staff");
  return res.data.data;   // MUST BE data.data
};

export const createStaff = async (data: any) => {
  const response = await api.post("/staff", data);

  return response.data;
};

export const deleteStaff = async (id: string) => {
  const response = await api.delete(`/staff/${id}`);

  return response.data;
};
