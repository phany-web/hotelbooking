import prisma from "../config/prisma";
import { createNotification } from "./notification.service";
export const createPayment = async (
  bookingId: string,
  paymentMethod: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      paymentStatus: "PENDING",
    },
  });

  return payment;
};

export const payBooking = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      booking: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  await prisma.payment.update({
    where: {
      id: paymentId,
    },

    data: {
      paymentStatus: "PAID",

      transactionRef: "TXN-" + Date.now(),
    },
  });

  await prisma.booking.update({
    where: {
      id: payment.bookingId,
    },

    data: {
      status: "CONFIRMED",
    },
  });
  await createNotification(
    payment.booking.userId,
    "Payment Success",
    "Your payment has been completed.",
    payment.bookingId,
  );
  return prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });
};

export const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      booking: true,
    },

    orderBy: {
      paymentDate: "desc",
    },
  });
};

export const getPaymentById = async (id: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id,
    },

    include: {
      booking: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};
