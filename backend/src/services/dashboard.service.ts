import prisma from "../config/prisma";

export const getHotelDashboard = async (hotelId: string) => {
  const [
    totalRooms,
    availableRooms,
    occupiedRooms,
    maintenanceRooms,

    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,

    revenueResult,
  ] = await Promise.all([
    prisma.room.count({
      where: { hotelId },
    }),

    prisma.room.count({
      where: {
        hotelId,
        status: "AVAILABLE",
      },
    }),

    prisma.room.count({
      where: {
        hotelId,
        status: "OCCUPIED",
      },
    }),

    prisma.room.count({
      where: {
        hotelId,
        status: "MAINTENANCE",
      },
    }),

    prisma.booking.count({
      where: {
        bookingDetails: {
          some: {
            room: { hotelId },
          },
        },
      },
    }),

    prisma.booking.count({
      where: {
        status: "PENDING",
        bookingDetails: {
          some: {
            room: { hotelId },
          },
        },
      },
    }),

    prisma.booking.count({
      where: {
        status: "CONFIRMED",
        bookingDetails: {
          some: {
            room: { hotelId },
          },
        },
      },
    }),

    prisma.booking.count({
      where: {
        status: "CHECKED_OUT",
        bookingDetails: {
          some: {
            room: { hotelId },
          },
        },
      },
    }),

    prisma.payment.aggregate({
      where: {
        paymentStatus: "PAID",

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
    }),
  ]);

  const totalRevenue = Number(revenueResult._sum.amount) || 0;

  return {
    totalRooms,
    availableRooms,
    occupiedRooms,
    maintenanceRooms,

    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,

    occupancyRate:
      totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,

    totalRevenue,
  };
};

export const getRevenueChart = async (hotelId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      paymentStatus: "PAID",

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

  months.forEach((month) => {
    revenueMap[month] = 0;
  });

  payments.forEach((payment) => {
    const month = months[new Date(payment.paymentDate).getMonth()];

    revenueMap[month] += Number(payment.amount);
  });

  return months.map((month) => ({
    month,
    revenue: revenueMap[month],
  }));
};

export const getRecentBookings = async (hotelId: string) => {
  return prisma.booking.findMany({
    where: {
      bookingDetails: {
        some: {
          room: {
            hotelId,
          },
        },
      },
    },

    include: {
      user: true,

      bookingDetails: {
        include: {
          room: {
            include: {
              hotel: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 10,
  });
};

export const getSystemDashboard = async () => {
  const [
    totalUsers,
    totalHotels,
    totalRooms,
    totalBookings,
    totalReviews,
    revenueResult,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.hotel.count(),

    prisma.room.count(),

    prisma.booking.count(),

    prisma.review.count(),

    prisma.payment.aggregate({
      where: {
        paymentStatus: "PAID",
      },

      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,
    totalHotels,
    totalRooms,
    totalBookings,
    totalReviews,

    totalRevenue: Number(revenueResult._sum.amount) || 0,
  };
};

export const getHousekeepingDashboard = async (hotelId: string) => {
  const dirtyRooms = await prisma.room.count({
    where: {
      hotelId,
      cleaningStatus: "DIRTY",
    },
  });

  const cleaningRooms = await prisma.room.count({
    where: {
      hotelId,
      cleaningStatus: "CLEANING",
    },
  });

  const cleanRooms = await prisma.room.count({
    where: {
      hotelId,
      cleaningStatus: "CLEAN",
    },
  });

  const maintenanceRooms = await prisma.room.count({
    where: {
      hotelId,
      status: "MAINTENANCE",
    },
  });

  return {
    dirtyRooms,
    cleaningRooms,
    cleanRooms,
    maintenanceRooms,
  };
};
