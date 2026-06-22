import api from "./axios";

export const getAllHotels = async () => {
  const response = await api.get("/hotel");

  return response.data.hotels;
};

export const createHotel = async (data: any) => {
  const response = await api.post("/hotel", data);

  return response.data.data;
};

export const updateHotel = async (id: string, data: any) => {
  const response = await api.patch(`/hotel/${id}`, data);

  return response.data.data;
};

export const deleteHotel = async (id: string) => {
  const response = await api.delete(`/hotel/${id}`);

  return response.data;
};
