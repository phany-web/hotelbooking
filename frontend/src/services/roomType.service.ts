import api from "./axios";

export const getRoomTypes = async () => {
  const response = await api.get("/roomType");

  return response.data.data;
};

export const createRoomType = async (data: {
  typeName: string;
  description: string;
  maxOccupancy: number;
}) => {
  const response = await api.post("/roomType", data);

  return response.data;
};

export const deleteRoomType = async (id: string) => {
  const response = await api.delete(`/roomType/${id}`);

  return response.data;
};
