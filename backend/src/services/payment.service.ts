import prisma from "../config/prisma";
import { generateKHQR } from "./khqr.service";
import { AppError } from "../utils/AppError";
export const createPayment = async (
  bookingId: string,
  amount: number,
  paymentMethod: string,
) => {
  return prisma.payment.create({
    data: {
      bookingId,
      amount,
      paymentMethod,
      paymentStatus: "PENDING",
    },
  });
};

export const markPaid = async (paymentId: string, transactionRef: string) => {
  return prisma.payment.update({
    where: {
      id: paymentId,
    },

    data: {
      paymentStatus: "PAID",
      transactionRef,
    },
  });
};

export const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      booking: true,
    },
  });
};

export const createKHQRPayment = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new AppError("Booking not found");
  }

  const existingPayment = await prisma.payment.findFirst({
    where: {
      bookingId,
    },
  });

  if (existingPayment) {
    const qr = await generateKHQR(Number(existingPayment.amount));

    return {
      payment: existingPayment,
      qr,
    };
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.totalAmount,

      paymentMethod: "KHQR",

      paymentStatus: "PENDING",
    },
  });

  const qr = await generateKHQR(Number(payment.amount));

  return {
    payment,
    qr,
  };
};
