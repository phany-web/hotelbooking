import prisma from "../config/prisma";

export const createPayment = async (
  bookingId: string,
  amount: number,
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
      amount,
      paymentMethod,
      paymentStatus: "PENDING",
    },

    include: {
      booking: true,
    },
  });

  return payment;
};

export const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      booking: {
        include: {
          user: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPaymentById = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      booking: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

export const updatePaymentStatus = async (
  paymentId: string,
  paymentStatus: "PAID" | "FAILED",
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      id: paymentId,
    },

    data: {
      paymentStatus,
      transactionRef: crypto.randomUUID(),
    },
  });

  if (paymentStatus === "PAID") {
    await prisma.booking.update({
      where: {
        id: payment.bookingId,
      },

      data: {
        status: "CONFIRMED",
      },
    });
  }

  return updatedPayment;
};
