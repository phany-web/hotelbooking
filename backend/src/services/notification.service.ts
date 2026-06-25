import prisma from "../config/prisma";

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  bookingId?: string,
) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      bookingId,
    },
  });
};

export const getMyNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markAsRead = async (notificationId: string, userId: string) => {
  return prisma.notification.update({
    where: {
      id: notificationId,
      userId,
    },

    data: {
      isRead: true,
    },
  });
};

export const markAllAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });
};

export const getUnreadCount = async (userId: string) => {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
};
