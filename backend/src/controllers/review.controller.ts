import { Request, Response } from "express";
import { AuthRequest } from "../types/express";

import * as ReviewService from "../services/review.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { hotelId, rating, comment } = req.body;

    const review = await ReviewService.createReview(
      req.user!.userId,
      hotelId,
      rating,
      comment,
    );

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHotelReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getHotelReviews(
      req.params.hotelId as string,
    );
    res.status(200).json({
      success: true,
      data: reviews,
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
    const reviews = await ReviewService.getAllReviews();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ReviewService.deleteReview(req.params.id as string);

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

export const rating = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getHotelRating(
      req.params.hotelId as string,
    );

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
