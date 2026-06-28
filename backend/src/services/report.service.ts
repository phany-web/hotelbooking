import prisma from "../config/prisma";
import { PaymentStatus, RoomStatus } from "@prisma/client";

export const getRevenueReport = async (
  hotelId: string,
  startDate: Date,
  endDate: Date,
) => {
  const payments = await prisma.payment.findMany({
    where: {
      paymentStatus: PaymentStatus.PAID,

      paymentDate: {
        gte: startDate,
        lte: endDate,
      },

      booking: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
      },
    },

    include: {
      booking: {
        include: {
          user: true,
        },
      },
    },
  });

  const revenue = await prisma.payment.aggregate({
    where: {
      paymentStatus: PaymentStatus.PAID,

      paymentDate: {
        gte: startDate,
        lte: endDate,
      },

      booking: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
      },
    },

    _sum: {
      amount: true,
    },

    _count: true,
  });

  return {
    totalRevenue: Number(revenue._sum.amount) || 0,

    totalTransactions: revenue._count,
  };
};
export const getBookingReport = async (hotelId: string) => {
  return prisma.booking.groupBy({
    by: ["status"],

    where: {
      bookingDetails: {
        some: {
          room: {
            hotelId,
          },
        },
      },
    },

    _count: {
      status: true,
    },
  });
};

export const getOccupancyReport = async (hotelId: string) => {
  const totalRooms = await prisma.room.count({
    where: {
      hotelId,
    },
  });

  const occupiedRooms = await prisma.room.count({
    where: {
      hotelId,
      status: RoomStatus.OCCUPIED,
    },
  });

  return {
    totalRooms,
    occupiedRooms,

    occupancyRate:
      totalRooms > 0
        ? Number(((occupiedRooms / totalRooms) * 100).toFixed(2))
        : 0,
  };
};

export const getDailyRevenue = async (hotelId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      paymentStatus: PaymentStatus.PAID,

      booking: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
      },
    },

    select: {
      amount: true,
      paymentDate: true,
    },

    orderBy: {
      paymentDate: "asc",
    },
  });

  const revenueMap: Record<string, number> = {};

  payments.forEach((payment) => {
    const day = payment.paymentDate.toISOString().slice(0, 10);

    revenueMap[day] = (revenueMap[day] || 0) + Number(payment.amount);
  });

  return Object.entries(revenueMap).map(([date, revenue]) => ({
    date,
    revenue,
  }));
};

export const getMonthlyRevenue = async (
  hotelId: string
) => {
  const payments = await prisma.payment.findMany({
    where: {
      paymentStatus: PaymentStatus.PAID,

      booking: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
      },
    },

    select: {
      amount: true,
      paymentDate: true,
    },
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueMap: Record<string, number> = {};

  months.forEach((m) => {
    revenueMap[m] = 0;
  });

  payments.forEach((payment) => {
    const month =
      months[
        payment.paymentDate.getMonth()
      ];

    revenueMap[month] += Number(
      payment.amount
    );
  });

  return months.map((month) => ({
    month,
    revenue: revenueMap[month],
  }));
};