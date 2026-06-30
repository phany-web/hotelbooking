import api from "./axios";

export const getMyNotifications = async () => {
  const response = await api.get("/notification/my");
  return response.data.data;
};

export const getUnreadCount = async () => {
  const response = await api.get("/notification/unread-count");
  return response.data.data;
};

export const markNotificationRead = async (id: string) => {
  await api.patch(`/notification/${id}/read`);
};

export const markAllRead = async () => {
  await api.patch("/notification/read-all");
};