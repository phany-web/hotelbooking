import prisma from "../config/prisma";

export const getInvoiceData = async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      booking: {
        include: {
          user: true,

          bookingDetails: {
            include: {
              room: true,
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};
