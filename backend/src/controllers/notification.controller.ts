import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as NotificationService from "../services/notification.service";

export const myNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await NotificationService.getMyNotifications(
      req.user!.userId,
    );

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const read = async (req: AuthRequest, res: Response) => {
  try {
    const notification = await NotificationService.markAsRead(
      req.params.id as string,
      req.user!.userId,
    );

    res.json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAll = async (req: AuthRequest, res: Response) => {
  try {
    await NotificationService.markAllAsRead(req.user!.userId);

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const unreadCount = async (req: AuthRequest, res: Response) => {
  try {
    const count = await NotificationService.getUnreadCount(req.user!.userId);

    res.json({
      success: true,
      data: count,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
