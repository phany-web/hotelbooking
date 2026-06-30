import api from "./axios";
import axios from "axios";
import { useAuthStore } from "../store/auth.store";
export const getMyHotelBookings = async () => {
  const response = await api.get("/booking/my-hotel");

  return response.data.data;
};

const API = "http://localhost:5000/api/booking";

export const createBooking = async (data: any) => {
  const token = useAuthStore.getState().token;

  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const confirmBooking = async (
  id: string
) => {
  const response = await api.patch(
    `/booking/${id}/confirm`
  );

  return response.data.data;
};

export const checkInBooking = async (
  id: string
) => {
  const response = await api.patch(
    `/booking/${id}/check-in`
  );

  return response.data.data;
};

export const checkOutBooking = async (
  id: string
) => {
  const response = await api.patch(
    `/booking/${id}/check-out`
  );

  return response.data.data;
};

export const cancelBooking = async (
  id: string
) => {
  const response = await api.patch(
    `/booking/${id}/cancel`
  );

  return response.data.data;
};

export const getAllBookings = async () => {
  const response = await api.get("/booking");

  return response.data.data;
};