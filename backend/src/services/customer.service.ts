import prisma from "../config/prisma";

export const getHotelCustomers = async (hotelId: string) => {
  const customers = await prisma.user.findMany({
    where: {
      bookings: {
        some: {
          bookingDetails: {
            some: {
              room: {
                hotelId,
              },
            },
          },
        },
      },
    },

    include: {
      bookings: {
        where: {
          bookingDetails: {
            some: {
              room: {
                hotelId,
              },
            },
          },
        },
      },
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,

    totalBookings: customer.bookings.length,

    totalSpent: customer.bookings.reduce(
      (sum, booking) => sum + Number(booking.totalAmount),
      0,
    ),
  }));
};
