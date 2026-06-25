import api from "./axios";

export const getHotelCustomers = async () => {
  const response = await api.get("/customer/my-hotel");

  return response.data.data;
};
