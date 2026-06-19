import api from "./axios";

export const getAllReviews = async () => {
  const response = await api.get("/review");

  return response.data.data;
};

export const deleteReview = async (id: string) => {
  const response = await api.delete(`/review/${id}`);

  return response.data;
};
