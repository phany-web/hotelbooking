import { Request, Response } from "express";
import { AuthRequest } from "../types/express";

import prisma from "../config/prisma";

import * as StaffTaskService from "../services/staffTask.service";

export const create = async (req: Request, res: Response) => {
  try {
    const task = await StaffTaskService.createTask(
      req.body.title,
      req.body.description,
      req.body.roomId,
      req.body.staffId,
    );

    res.json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const tasks = await StaffTaskService.getTasks();

  res.json({
    success: true,
    data: tasks,
  });
};

export const myTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await StaffTaskService.getMyTasks(req.user!.userId);

  res.json({
    success: true,
    data: tasks,
  });
};

export const updateStatus = async (req: Request, res: Response) => {
  const task = await StaffTaskService.updateStatus(
    req.params.id as string,
    req.body.status,
  );

  res.json({
    success: true,
    data: task,
  });
};

export const dashboard = async (req: AuthRequest, res: Response) => {
  try {
    const result = await StaffTaskService.getStaffDashboard(req.user!.userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const data = await StaffTaskService.getStaffDashboard(req.user!.userId);

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const startTask = async (req: Request, res: Response) => {
  const task = await StaffTaskService.updateStatus(
    req.params.id as string,
    "IN_PROGRESS",
  );

  await prisma.room.update({
    where: {
      id: task.roomId,
    },
    data: {
      status: "CLEANING",
      cleaningStatus: "CLEANING",
    },
  });

  res.json({
    success: true,
    data: task,
  });
};

export const completeTask = async (req: Request, res: Response) => {
  const task = await StaffTaskService.updateStatus(
    req.params.id as string,
    "COMPLETED",
  );

  await prisma.room.update({
    where: {
      id: task.roomId,
    },
    data: {
      status: "AVAILABLE",
      cleaningStatus: "CLEAN",
    },
  });

  res.json({
    success: true,
    data: task,
  });
};
