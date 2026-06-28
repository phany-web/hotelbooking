import prisma from "../config/prisma";
import { createNotification } from "./notification.service";
import { AppError } from "../utils/AppError";
import { BookingStatus, RoomStatus } from "@prisma/client";
import { createAuditLog } from "./auditLog.service";

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
    throw new AppError("Room not found", 404);
  }

  if (room.status === "MAINTENANCE" || room.status === "CLEANING") {
    throw new AppError(`Room is currently ${room.status}`);
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (checkOut <= checkIn) {
    throw new AppError("Check-out date must be after check-in date");
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
    throw new AppError("Room already booked for selected dates");
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
    throw new AppError("Booking not found");
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

export const cancelBooking = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (
    booking.status === BookingStatus.CHECKED_IN ||
    booking.status === BookingStatus.CHECKED_OUT
  ) {
    throw new AppError("Cannot cancel completed booking", 400);
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  });
};

export const checkInBooking = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      bookingDetails: true,
    },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new AppError("Booking must be confirmed before check-in", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: BookingStatus.CHECKED_IN,
        actualCheckIn: new Date(),
      },
    });

    for (const detail of booking.bookingDetails) {
      await tx.room.update({
        where: {
          id: detail.roomId,
        },
        data: {
          status: RoomStatus.OCCUPIED,
        },
      });
    }
  });

  await createAuditLog(userId, "BOOKING_CHECKED_IN", "BOOKING", bookingId, {
    bookingId,
    checkedInAt: new Date(),
  });

  return {
    success: true,
    message: "Check-in completed",
  };
};

export const checkOutBooking = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      bookingDetails: true,
    },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.status !== BookingStatus.CHECKED_IN) {
    throw new AppError("Guest must be checked in first", 400);
  }

  return prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CHECKED_OUT,
        actualCheckOut: new Date(),
      },
    });

    for (const detail of booking.bookingDetails) {
      await tx.room.update({
        where: {
          id: detail.roomId,
        },
        data: {
          status: RoomStatus.DIRTY,
        },
      });
    }

    return {
      success: true,
      message: "Check-out completed",
    };
  });
};

export const getBookingsByHotel = async (hotelId: string) => {
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
              roomType: true,
            },
          },
        },
      },
    },
  });
};

export const confirmBooking = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.status !== BookingStatus.PENDING) {
    throw new AppError("Only pending bookings can be confirmed", 400);
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.CONFIRMED,
    },
  });

  await createAuditLog(userId, "BOOKING_CONFIRMED", "BOOKING", bookingId);

  return updatedBooking;
};

export const getBookingReport = async (hotelId: string) => {
  const bookings = await prisma.booking.groupBy({
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

    _count: true,
  });

  return bookings;
};
