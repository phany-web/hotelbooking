import { Response } from "express";

import { AuthRequest } from "../types/express";
import prisma from "../config/prisma";

import * as DashboardService from "../services/dashboard.service";

export const hotelDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    const data = await DashboardService.getHotelDashboard(hotelId!);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const recentBookings = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    const data = await DashboardService.getRecentBookings(hotelId!);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const revenueChart = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    const data = await DashboardService.getRevenueChart(hotelId!);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const systemDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const data = await DashboardService.getSystemDashboard();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
