import { Request, Response } from "express";
import { AuthRequest } from "../types/express";

import * as RoomService from "../services/room.service";

export const create = async (req: Request, res: Response) => {
  try {
    const room = await RoomService.createRoom(req.body);

    res.status(201).json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const rooms = await RoomService.getAllRooms();

  res.json({
    success: true,
    data: rooms,
  });
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const room = await RoomService.getRoomById(req.params.id as string);

    res.json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const room = await RoomService.updateRoom(
      req.params.id as string,
      req.body,
    );

    res.json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await RoomService.deleteRoom(req.params.id as string);

    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getByHotel = async (req: Request, res: Response) => {
  const rooms = await RoomService.getRoomsByHotel(req.params.hotelId as string);

  res.json({
    success: true,
    data: rooms,
  });
};

export const getMyHotelRooms = async (req: AuthRequest, res: Response) => {
  try {
    const hotelId = req.user?.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel not assigned",
      });
    }

    const rooms = await RoomService.getRoomsByHotel(hotelId);

    return res.json({
      success: true,
      data: rooms,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
