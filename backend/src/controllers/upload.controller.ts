import { Request, Response } from "express";

export const uploadHotelImage = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    return res.status(200).json({
      success: true,
      imageUrl: `/uploads/hotels/${req.file.filename}`,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};