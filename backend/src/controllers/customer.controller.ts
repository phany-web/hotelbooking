import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as CustomerService from "../services/customer.service";

export const getMyHotelCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const customers = await CustomerService.getHotelCustomers(hotelId);

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
