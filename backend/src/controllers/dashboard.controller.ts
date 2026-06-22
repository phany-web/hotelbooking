import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as DashboardService from "../services/dashboard.service";

export const systemDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const data = await DashboardService.getSystemDashboard();

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const hotelDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel not assigned",
      });
    }

    const data = await DashboardService.getHotelDashboard(hotelId);

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const recentBookings = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel not assigned",
      });
    }

    const data = await DashboardService.getRecentBookings(hotelId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const revenueChart = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel not assigned",
      });
    }

    const data = await DashboardService.getRevenueChart(hotelId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};