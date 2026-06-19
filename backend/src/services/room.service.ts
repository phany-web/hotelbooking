import prisma from "../config/prisma";

export const createRoom = async (data: {
  roomNumber: string;
  floorNumber?: number;
  price: number;
  hotelId: string;
  roomTypeId: string;
}) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      id: data.hotelId,
    },
  });

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const roomType = await prisma.roomType.findUnique({
    where: {
      id: data.roomTypeId,
    },
  });

  if (!roomType) {
    throw new Error("Room type not found");
  }

  return prisma.room.create({
    data,
    include: {
      hotel: true,
      roomType: true,
    },
  });
};

export const getAllRooms = async () => {
  return prisma.room.findMany({
    include: {
      hotel: true,
      roomType: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRoomById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      hotel: true,
      roomType: true,
    },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

export const updateRoom = async (id: string, data: any) => {
  await getRoomById(id);

  return prisma.room.update({
    where: { id },
    data,
  });
};

export const deleteRoom = async (id: string) => {
  await getRoomById(id);

  return prisma.room.delete({
    where: { id },
  });
};

export const getRoomsByHotel = async (hotelId: string) => {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    include: {
      roomType: true,
    },
  });
};
