import { Request, Response } from "express";

import * as PaymentService from "../services/payment.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    const payment = await PaymentService.createPayment(
      bookingId,
      paymentMethod,
    );

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const pay = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.payBooking(req.params.id as string);

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const payments = await PaymentService.getAllPayments();

  res.json({
    success: true,
    data: payments,
  });
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.getPaymentById(req.params.id as string);

    res.json({
      success: true,
      data: payment,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
