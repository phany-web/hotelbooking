import prisma from "../config/prisma";

export const getHotelDashboard = async (hotelId: string) => {
  const totalRooms = await prisma.room.count({
    where: {
      hotelId,
    },
  });

  const availableRooms = await prisma.room.count({
    where: {
      hotelId,
      status: "AVAILABLE",
    },
  });

  const occupiedRooms = await prisma.room.count({
    where: {
      hotelId,
      status: "OCCUPIED",
    },
  });

  const maintenanceRooms = await prisma.room.count({
    where: {
      hotelId,
      status: "MAINTENANCE",
    },
  });

  const totalBookings = await prisma.booking.count({
    where: {
      bookingDetails: {
        some: {
          room: {
            hotelId,
          },
        },
      },
    },
  });

  const pendingBookings = await prisma.booking.count({
    where: {
      status: "PENDING",
      bookingDetails: {
        some: {
          room: {
            hotelId,
          },
        },
      },
    },
  });

  const confirmedBookings = await prisma.booking.count({
    where: {
      status: "CONFIRMED",
      bookingDetails: {
        some: {
          room: {
            hotelId,
          },
        },
      },
    },
  });

  const completedBookings = await prisma.booking.count({
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
  });

  const revenueBookings = await prisma.booking.findMany({
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
    select: {
      totalAmount: true,
    },
  });

  const totalRevenue = revenueBookings.reduce(
    (sum, booking) => sum + Number(booking.totalAmount),
    0,
  );

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


export const getRevenueChart =async (hotelId: string) => {

  const bookings =
    await prisma.booking.findMany({
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

      select: {
        totalAmount: true,
        createdAt: true,
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

  const revenueMap: Record<
    string,
    number
  > = {};

  months.forEach((month) => {
    revenueMap[month] = 0;
  });

  bookings.forEach((booking) => {
    const month =
      months[
        new Date(
          booking.createdAt
        ).getMonth()
      ];

    revenueMap[month] +=
      Number(booking.totalAmount);
  });

  return months.map((month) => ({
    month,
    revenue: revenueMap[month],
  }));
};
export const getRecentBookings =async (hotelId: string) => {

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

    totalRevenue:
      Number(
        revenueResult._sum.totalAmount || 0
      ),
  };
};