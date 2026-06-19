import { Request, Response } from "express";
import { loginUser, refreshAccessToken } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

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

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const token = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: token,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
