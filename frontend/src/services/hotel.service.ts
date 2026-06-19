import api from "./axios";

export const getAllHotels = async () => {
  const response = await api.get("/hotel");

  return response.data.hotels;
};

export const deleteHotel = async (id: string) => {
  const response = await api.delete(`/hotel/${id}`);

  return response.data;
};
