// src/controllers/roomType.controller.ts

import { Request, Response } from "express";

import {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType,
} from "../services/roomType.service";

export const create = async (req: Request, res: Response) => {
  try {
    const roomType = await createRoomType(req.body);

    res.status(201).json({
      success: true,
      data: roomType,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const roomTypes = await getAllRoomTypes();

    res.status(200).json({
      success: true,
      data: roomTypes,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const roomType = await getRoomTypeById(id);

    res.status(200).json({
      success: true,
      data: roomType,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const roomType = await updateRoomType(id, req.body);

    res.status(200).json({
      success: true,
      data: roomType,
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
    const id = req.params.id as string;

    const result = await deleteRoomType(id);

    res.status(200).json({
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
