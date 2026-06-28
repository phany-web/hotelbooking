import { Response } from "express";
import { AuthRequest } from "../types/express";

import * as ReportService from "../services/report.service";

export const revenue = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user!.hotelId!;

    const startDate = new Date(req.query.startDate as string);

    const endDate = new Date(req.query.endDate as string);

    const report = await ReportService.getRevenueReport(
      hotelId,
      startDate,
      endDate,
    );

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const dailyRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user!.hotelId!;

    const report = await ReportService.getDailyRevenue(hotelId);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const monthlyRevenue = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user!.hotelId!;

    const data = await ReportService.getMonthlyRevenue(hotelId);

    res.status(200).json({
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
