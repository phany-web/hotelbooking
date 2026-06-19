
import prisma from "../config/prisma";

export const createRoomType = async (data: {
  typeName: string;
  description?: string;
  maxOccupancy: number;
}) => {
  return prisma.roomType.create({
    data,
  });
};

export const getAllRoomTypes = async () => {
  return prisma.roomType.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRoomTypeById = async (
  id: string
) => {
  const roomType =
    await prisma.roomType.findUnique({
      where: { id },
    });

  if (!roomType) {
    throw new Error(
      "Room type not found"
    );
  }

  return roomType;
};

export const updateRoomType = async (
  id: string,
  data: {
    typeName?: string;
    description?: string;
    maxOccupancy?: number;
  }
) => {
  const roomType =
    await prisma.roomType.findUnique({
      where: { id },
    });

  if (!roomType) {
    throw new Error(
      "Room type not found"
    );
  }

  return prisma.roomType.update({
    where: { id },
    data,
  });
};

export const deleteRoomType = async (
  id: string
) => {
  const roomType =
    await prisma.roomType.findUnique({
      where: { id },
    });

  if (!roomType) {
    throw new Error(
      "Room type not found"
    );
  }

  await prisma.roomType.delete({
    where: { id },
  });

  return {
    message:
      "Room type deleted successfully",
  };
};