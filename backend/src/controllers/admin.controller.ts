import { Request, Response } from "express";
import {
  createAdminService,
  getAllAdminsService,
  disableAdminService,
  enableAdminService,
} from "../services/admin.service";

export const createAdmin =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        fullName,
        email,
        password,
        phone,
      } = req.body;

      const admin =
        await createAdminService(
          fullName,
          email,
          password,
          phone
        );

      res.status(201).json({
        success: true,
        data: admin,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getAllAdmins =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const admins =
        await getAllAdminsService();

      res.json({
        success: true,
        data: admins,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const disableAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const admin =
      await disableAdminService(id);

    res.json({
      success: true,
      message:
        "Admin disabled successfully",
      data: admin,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const enableAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const admin =
      await enableAdminService(id);

    res.json({
      success: true,
      message:
        "Admin enabled successfully",
      data: admin,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};