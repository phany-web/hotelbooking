import ExcelJS from "exceljs";
import prisma from "../config/prisma";

export const exportBookingsExcel = async (hotelId: string) => {
  const bookings = await prisma.booking.findMany({
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
          room: true,
        },
      },
    },
  });

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Bookings");

  worksheet.columns = [
    {
      header: "Booking ID",
      key: "id",
      width: 40,
    },
    {
      header: "Guest",
      key: "guest",
      width: 30,
    },
    {
      header: "Room",
      key: "room",
      width: 15,
    },
    {
      header: "Status",
      key: "status",
      width: 20,
    },
    {
      header: "Amount",
      key: "amount",
      width: 15,
    },
  ];

  bookings.forEach((booking) => {
    worksheet.addRow({
      id: booking.id,
      guest: booking.user.fullName,
      room: booking.bookingDetails[0]?.room?.roomNumber || "-",
      status: booking.status,
      amount: Number(booking.totalAmount),
    });
  });

  return workbook;
};
