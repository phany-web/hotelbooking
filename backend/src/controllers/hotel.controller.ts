import { Request, Response } from "express";
import * as HotelService from "../services/hotel.service";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../services/hotel.service";
import { AuthRequest } from "../types/express";
export const create = async (req: AuthRequest, res: Response) => {
  try {
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotel = await createHotel(req.body, adminId);

    return res.status(201).json({
      success: true,
      data: hotel,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const adminId = req.user?.userId;

    const hotels = await getAllHotels(adminId,page,limit);

    return res.status(200).json({
      success: true,
      ...hotels,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const hotel = await getHotelById(id);

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const hotel = await updateHotel(id, req.body);

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await deleteHotel(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const { hotelName, location, minPrice, maxPrice } = req.query;

    const hotels = await HotelService.searchHotels(
      hotelName as string,
      location as string,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );

    res.status(200).json({
      success: true,
      total: hotels.length,
      data: hotels,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const topHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getTopHotels();

    return res.status(200).json({
      success: true,
      message: "Top hotels fetched successfully",
      data: hotels,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
