import api from "./axios";

export const getRoomTypes = async () => {
  const response = await api.get("/roomTypes");

  return response.data.data;
};

export const createRoomType = async (data: {
  typeName: string;
  description: string;
}) => {
  const response = await api.post("/roomTypes", data);

  return response.data;
};

export const deleteRoomType = async (id: string) => {
  const response = await api.delete(`/roomTypes/${id}`);

  return response.data;
};
