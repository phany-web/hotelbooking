import api from "./axios";

export const getAllReviews = async () => {
  const response = await api.get("/review");

  return response.data.data;
};

export const getHotelReviews = async (hotelId: string) => {
  const response = await api.get(`/review/hotel/${hotelId}`);

  return response.data.data;
};

export const deleteReview = async (reviewId: string) => {
  const response = await api.delete(`/review/${reviewId}`);

  return response.data.data;
};

export const getHotelRating = async (hotelId: string) => {
  const response = await api.get(`/review/hotel/${hotelId}/rating`);

  return response.data.data;
};

export const getMyHotelReviews = async () => {
  const response = await api.get("/review/my-hotel");

  return response.data.data;
};
