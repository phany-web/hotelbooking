import { Request, Response } from "express";
import * as StaffService from "../services/staff.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password, hotelId } = req.body;

    const staff = await StaffService.createStaff(
      fullName,
      email,
      phone,
      password,
      hotelId,
    );

    res.status(201).json({
      success: true,
      data: staff,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const staffs = await StaffService.getAllStaff();

  res.json({
    success: true,
    data: staffs,
  });
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const staff = await StaffService.getStaffById(req.params.id as string);

    res.json({
      success: true,
      data: staff,
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
    const staff = await StaffService.updateStaff(
      req.params.id as string,
      req.body,
    );

    res.json({
      success: true,
      data: staff,
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
    const result = await StaffService.deleteStaff(req.params.id as string);

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
