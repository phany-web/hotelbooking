import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export const createAdvertisement = async (
  title: string,
  imageUrl: string,
  targetUrl: string,
) => {
  return prisma.advertisement.create({
    data: {
      title,
      imageUrl,
      targetUrl,
    },
  });
};

export const getAllAdvertisements = async () => {
  return prisma.advertisement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAdvertisementById = async (id: string) => {
  const advertisement = await prisma.advertisement.findUnique({
    where: { id },
  });

  if (!advertisement) {
    throw new AppError("Advertisement not found");
  }

  return advertisement;
};

export const updateAdvertisement = async (id: string, data: any) => {
  const advertisement = await prisma.advertisement.findUnique({
    where: { id },
  });

  if (!advertisement) {
    throw new AppError("Advertisement not found");
  }

  return prisma.advertisement.update({
    where: { id },
    data,
  });
};

export const deleteAdvertisement = async (id: string) => {
  const advertisement = await prisma.advertisement.findUnique({
    where: { id },
  });

  if (!advertisement) {
    throw new AppError("Advertisement not found");
  }

  await prisma.advertisement.delete({
    where: { id },
  });

  return {
    message: "Advertisement deleted successfully",
  };
};
