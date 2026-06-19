import prisma from "../config/prisma";

export const getSystemDashboard = async () => {
  const [
    totalUsers,
    totalHotels,
    totalRooms,
    totalBookings,
    totalReviews,
    revenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.hotel.count(),

    prisma.room.count(),

    prisma.booking.count(),

    prisma.review.count(),

    prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },

      where: {
        status: "COMPLETED",
      },
    }),
  ]);

  return {
    totalUsers,
    totalHotels,
    totalRooms,
    totalBookings,
    totalReviews,

    totalRevenue: Number(revenue._sum.totalAmount || 0),
  };
};

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

    revenue,
  ] = await Promise.all([
    prisma.room.count({
      where: {
        hotelId,
      },
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

    prisma.bookingDetail.count({
      where: {
        room: {
          hotelId,
        },
      },
    }),

    prisma.booking.count({
      where: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
        status: "PENDING",
      },
    }),

    prisma.booking.count({
      where: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
        status: "CONFIRMED",
      },
    }),

    prisma.booking.count({
      where: {
        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
        status: "COMPLETED",
      },
    }),

    prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },

      where: {
        status: "COMPLETED",

        bookingDetails: {
          some: {
            room: {
              hotelId,
            },
          },
        },
      },
    }),
  ]);

  const occupancyRate =
    totalRooms === 0
      ? 0
      : Number(((occupiedRooms / totalRooms) * 100).toFixed(2));

  return {
    totalRooms,
    availableRooms,
    occupiedRooms,
    maintenanceRooms,

    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,

    totalRevenue: Number(revenue._sum.totalAmount || 0),

    occupancyRate,
  };
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

    take: 5,

    orderBy: {
      createdAt: "desc",
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
  });
};
