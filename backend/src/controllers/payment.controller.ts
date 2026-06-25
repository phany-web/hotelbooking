import { Request, Response } from "express";

import * as PaymentService from "../services/payment.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    const payment = await PaymentService.createPayment(
      bookingId,
      amount,
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

export const getAll = async (req: Request, res: Response) => {
  const payments = await PaymentService.getAllPayments();

  res.json({
    success: true,
    data: payments,
  });
};

export const getOne = async (req: Request, res: Response) => {
  const payment = await PaymentService.getPaymentById(req.params.id as string);

  res.json({
    success: true,
    data: payment,
  });
};

export const updateStatus = async (req: Request, res: Response) => {
  const payment = await PaymentService.updatePaymentStatus(
    req.params.id as string,
    req.body.paymentStatus,
  );

  res.json({
    success: true,
    data: payment,
  });
};
