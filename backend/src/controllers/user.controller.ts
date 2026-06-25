import { Request, Response } from "express";

import {
  getAllUsersService,
  getUserByIdService,
  disableUserService,
  enableUserService,
} from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const user = await getUserByIdService(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const disableUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const user = await disableUserService(id);

    res.status(200).json({
      success: true,
      message: "User disabled successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const enableUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const user = await getUserByIdService(id);

    res.status(200).json({
      success: true,
      message: "User enabled successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
