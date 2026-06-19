import prisma from "../config/prisma";
import { createNotification } from "./notification.service";
import { AppError } from "../utils/AppError";
export const createBooking = async (
  userId: string,
  roomId: string,
  checkInDate: string,
  checkOutDate: string,
) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      roomType: true,
      hotel: true,
    },
  });

  if (!room) {
    throw new AppError(
  "Room not found",
  404
);
  }

  if (room.status === "MAINTENANCE" || room.status === "CLEANING") {
    throw new Error(`Room is currently ${room.status}`);
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkOut <= checkIn) {
    throw new Error("Check-out date must be after check-in date");
  }

  const conflictBooking = await prisma.bookingDetail.findFirst({
    where: {
      roomId,
      AND: [
        {
          checkInDate: {
            lt: checkOut,
          },
        },
        {
          checkOutDate: {
            gt: checkIn,
          },
        },
      ],
    },
  });

  if (conflictBooking) {
    throw new Error("Room already booked for selected dates");
  }

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalAmount = Number(room.price) * nights;

  const booking = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        userId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalAmount,
        status: "PENDING",

        bookingDetails: {
          create: {
            roomId: room.id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            pricePerRoom: room.price,
            subTotal: totalAmount,
          },
        },
      },

      include: {
        bookingDetails: {
          include: {
            room: true,
          },
        },

        user: true,
      },
    });

    return booking;
  });

  await createNotification(
    userId,
    "Booking Created",
    "Your booking was created successfully.",
    booking.id,
  );

  return booking;
};
export const getMyBookings = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: {
        userId,
      },

      skip,
      take: limit,

      include: {
        bookingDetails: {
          include: {
            room: {
              include: {
                hotel: true,
                roomType: true,
              },
            },
          },
        },

        payments: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.booking.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    data: bookings,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },

    include: {
      user: true,

      bookingDetails: {
        include: {
          room: {
            include: {
              hotel: true,
              roomType: true,
            },
          },
        },
      },

      payments: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};

export const getAllBookings = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      skip,
      take: limit,

      include: {
        user: true,

        bookingDetails: {
          include: {
            room: {
              include: {
                hotel: true,
                roomType: true,
              },
            },
          },
        },

        payments: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.booking.count(),
  ]);

  return {
    data: bookings,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const cancelBooking = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.userId !== userId) {
    throw new Error("You cannot cancel this booking");
  }

  if (booking.status === "COMPLETED") {
    throw new Error("Completed booking cannot be cancelled");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "CANCELLED",
    },
  });
};

export const checkInBooking = async (bookingId: string) => {
  const booking = await getBookingById(bookingId);

  const roomId = booking.bookingDetails[0].room.id;

  await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      status: "OCCUPIED",
    },
  });

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CONFIRMED",
    },
  });
};

export const checkOutBooking = async (bookingId: string) => {
  const booking = await getBookingById(bookingId);

  const roomId = booking.bookingDetails[0].room.id;

  await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      status: "CLEANING",
    },
  });

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "COMPLETED",
    },
  });
};
