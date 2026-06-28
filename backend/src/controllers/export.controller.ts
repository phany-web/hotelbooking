import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as ExportService from "../services/export.service";

export const bookingsExcel = async (req: AuthRequest, res: Response) => {
  const hotelId = req.user!.hotelId!;

  const workbook = await ExportService.exportBookingsExcel(hotelId);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader("Content-Disposition", "attachment; filename=bookings.xlsx");

  await workbook.xlsx.write(res);

  res.end();
};
