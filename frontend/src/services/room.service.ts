import api from "./axios";

export const getAllRooms = async () => {
  const response = await api.get("/room");

  return response.data.data;
};

export const getRoomsByHotel = async (hotelId: string) => {
  const response = await api.get(`/room/hotel/${hotelId}`);

  return response.data.data;
};

export const getRoomById = async (id: string) => {
  const response = await api.get(`/room/${id}`);

  return response.data.data;
};

export const createRoom = async (data: any) => {
  const response = await api.post("/room", data);

  return response.data;
};

export const updateRoom = async (id: string, data: any) => {
  const response = await api.patch(`/room/${id}`, data);

  return response.data;
};

export const deleteRoom = async (id: string) => {
  const response = await api.delete(`/room/${id}`);

  return response.data;
};

export const getMyHotelRooms = async () => {
  const response = await api.get(
    "/room/my-hotel"
  );

  return response.data.data;
};