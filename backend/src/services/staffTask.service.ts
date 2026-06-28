import prisma from "../config/prisma";
import { TaskStatus } from "@prisma/client";


export const createTask = async (
  title: string,
  description: string,
  roomId: string,
  staffId: string,
) => {
  return prisma.staffTask.create({
    data: {
      title,
      description,
      roomId,
      staffId,
    },
  });
};

export const getTasks = async () => {
  return prisma.staffTask.findMany({
    include: {
      room: true,
      staff: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateStatus = async (id: string, status: TaskStatus) => {
  return prisma.staffTask.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
};

export const getMyTasks = async (staffId: string) => {
  return prisma.staffTask.findMany({
    where: {
      staffId,
    },

    include: {
      room: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStaffDashboard = async (staffId: string) => {
  const totalTasks = await prisma.staffTask.count({
    where: {
      staffId,
    },
  });

  const pendingTasks = await prisma.staffTask.count({
    where: {
      staffId,
      status: "PENDING",
    },
  });

  const inProgressTasks = await prisma.staffTask.count({
    where: {
      staffId,
      status: "IN_PROGRESS",
    },
  });

  const completedTasks = await prisma.staffTask.count({
    where: {
      staffId,
      status: "COMPLETED",
    },
  });

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
};
