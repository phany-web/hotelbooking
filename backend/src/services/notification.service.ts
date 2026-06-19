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
  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.notification.update({
    where: {
      id: notificationId,
    },

    data: {
      isRead: true,
    },
  });
};

export const unreadCount = async (userId: string) => {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
};

export const deleteNotification = async (
  notificationId: string,
  userId: string,
) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });

  return {
    message: "Notification deleted",
  };
};
