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

export const paid = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.markPaid(
      req.params.id as string,
      req.body.transactionRef,
    );

    res.json({
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


export const generateKHQR =async (
    req: Request,
    res: Response,
  ) => {
    try {
      const result =
        await PaymentService.createKHQRPayment(
          req.params.bookingId as string,
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };
