import { Request, Response } from "express";
import { AuthRequest } from "../types/express";
import * as StaffTaskService from "../services/staffTask.service";

/* ================= CREATE TASK ================= */
export const create = async (req: Request, res: Response) => {
  try {
    const { title, description, roomId, staffId } = req.body;

    const task = await StaffTaskService.createTask(
      title,
      description,
      roomId,
      staffId
    );

    res.status(201).json({
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

/* ================= GET ALL TASKS ================= */
export const getAll = async (_: Request, res: Response) => {
  try {
    const tasks = await StaffTaskService.getAllTasks();

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= MY TASKS (STAFF) ================= */
export const myTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await StaffTaskService.getMyTasks(req.user!.userId);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= START TASK ================= */
export const startTask = async (req: Request, res: Response) => {
  try {
    const task = await StaffTaskService.startTask(req.params.id as string);

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

/* ================= COMPLETE TASK ================= */
export const completeTask = async (req: Request, res: Response) => {
  try {
    const task = await StaffTaskService.completeTask(req.params.id as string);

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

/* ================= DASHBOARD ================= */
export const dashboard = async (req: AuthRequest, res: Response) => {
  try {
    const data = await StaffTaskService.getStaffDashboard(
      req.user!.userId
    );

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