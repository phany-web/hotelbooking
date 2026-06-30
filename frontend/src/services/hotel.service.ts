import api from "./axios";
import axios from "axios";
// import api from "./api";
const API_URL = "http://localhost:5000/api/hotels";
export const getAllHotels = async () => {
  const response = await api.get("/hotel");
  return response.data.hotels;
};

// export const getHotelById = async (id: string) => {
//   const response = await api.get(`/hotel/${id}`);
//   return response.data.hotel;
// };
// export const getHotels = () => {
//   return api.get("/hotel");
// };
export const getHotels = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getHotelById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
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

export const getMyHotels = async () => {
  const response = await api.get("/hotel/my-hotels");

  return response.data.data;
};

export const getPublicHotels = async () => {
  const res = await api.get("/hotel/public");

  return res.data;
};

export const getHotelDetail = async (
  hotelId: string
) => {
  const res = await api.get(`/hotel/${hotelId}`);

  return res.data;
};