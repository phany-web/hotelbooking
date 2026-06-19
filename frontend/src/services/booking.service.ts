import api from "./axios";

export const getAllBookings = async () => {
  const response = await api.get("/booking");

  return response.data.data;
};

export const getBookingById = async (id: string) => {
  const response = await api.get(`/booking/${id}`);

  return response.data.data;
};

export const checkInBooking = async (id: string) => {
  const response = await api.patch(`/booking/${id}/check-in`);

  return response.data;
};

export const checkOutBooking = async (id: string) => {
  const response = await api.patch(`/booking/${id}/check-out`);

  return response.data;
};
