import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as NotificationService from "../services/notification.service";

export const myNotifications = async (req: AuthRequest, res: Response) => {
  const notifications = await NotificationService.getMyNotifications(
    req.user!.userId,
  );

  res.json({
    success: true,
    data: notifications,
  });
};

export const read = async (req: AuthRequest, res: Response) => {
  try {
    const result = await NotificationService.markAsRead(
      req.params.id as string,
      req.user!.userId,
    );

    res.json({
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

export const unread = async (req: AuthRequest, res: Response) => {
  const count = await NotificationService.unreadCount(req.user!.userId);

  res.json({
    success: true,
    count,
  });
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await NotificationService.deleteNotification(
      req.params.id as string,
      req.user!.userId,
    );

    res.json({
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
