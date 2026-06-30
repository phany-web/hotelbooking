import prisma from "../config/prisma";

/* ================= CREATE TASK ================= */
export const createTask = async (
  title: string,
  description: string,
  roomId: string,
  staffId: string
) => {
  return prisma.staffTask.create({
    data: {
      title,
      description,
      roomId,
      staffId,
    },
    include: {
      room: true,
      staff: true,
    },
  });
};

/* ================= GET ALL ================= */
export const getAllTasks = async () => {
  return prisma.staffTask.findMany({
    include: {
      room: true,
      staff: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

/* ================= MY TASKS ================= */
export const getMyTasks = async (staffId: string) => {
  return prisma.staffTask.findMany({
    where: { staffId },
    include: { room: true },
    orderBy: { createdAt: "desc" },
  });
};

/* ================= START TASK ================= */
export const startTask = async (taskId: string) => {
  const task = await prisma.staffTask.update({
    where: { id: taskId },
    data: {
      status: "IN_PROGRESS",
    },
  });

  // 🔥 ROOM UPDATE (MOVES TO CLEANING)
  await prisma.room.update({
    where: { id: task.roomId },
    data: {
      status: "CLEANING",
      cleaningStatus: "CLEANING",
    },
  });

  return task;
};

/* ================= COMPLETE TASK ================= */
export const completeTask = async (taskId: string) => {
  const task = await prisma.staffTask.update({
    where: { id: taskId },
    data: {
      status: "COMPLETED",
    },
  });

  // 🔥 ROOM BECOMES AVAILABLE
  await prisma.room.update({
    where: { id: task.roomId },
    data: {
      status: "AVAILABLE",
      cleaningStatus: "CLEAN",
    },
  });

  return task;
};

/* ================= DASHBOARD ================= */
export const getStaffDashboard = async (staffId: string) => {
  const tasks = await prisma.staffTask.findMany({
    where: { staffId },
  });

  const pending = tasks.filter(t => t.status === "PENDING").length;
  const inProgress = tasks.filter(t => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter(t => t.status === "COMPLETED").length;

  return {
    total: tasks.length,
    pending,
    inProgress,
    completed,
  };
};