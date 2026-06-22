import api from "./axios";

export const getSystemDashboard = async () => {
  const response = await api.get("/dashboard/system");

  return response.data.data;
};

export const getHotelDashboard = async () => {
  const response = await api.get("/dashboard/hotel");

  return response.data.data;
};

export const getRecentBookings = async () => {
  const response = await api.get("/dashboard/recent-bookings");
  return response.data.data;
};

export const getRevenueChart = async () => {
  const response = await api.get("/dashboard/revenue-chart");

  return response.data.data;
};
