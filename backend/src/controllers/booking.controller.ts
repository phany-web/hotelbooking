import { Response } from "express";

import { AuthRequest } from "../types/express";

import * as BookingService from "../services/booking.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    const booking = await BookingService.createBooking(
      req.user!.userId,
      roomId,
      checkInDate,
      checkOutDate,
    );

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myBookings = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const bookings = await BookingService.getMyBookings(
      req.user!.userId,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      ...bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const bookings = await BookingService.getAllBookings(page, limit);

    res.status(200).json({
      success: true,
      ...bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await BookingService.getBookingById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancel = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await BookingService.cancelBooking(
      req.params.id as string,
      req.user!.userId,
    );

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkIn = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await BookingService.checkInBooking(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkOut = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await BookingService.checkOutBooking(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
