import bcrypt from "bcrypt";
import prisma from "../config/prisma";

import { AppError } from "../utils/AppError";

export const createStaff = async (
  fullName: string,
  email: string,
  phone: string,
  password: string,
  hotelId: string,
  adminId: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("Email already exists");
  }

  const role = await prisma.role.findUnique({
    where: {
      roleName: "STAFF",
    },
  });

  if (!role) {
    throw new AppError("STAFF role not found");
  }

  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
      adminId,
    },
  });

  if (!hotel) {
    throw new AppError("Hotel not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      fullName,
      email,
      phone,
      password: hashedPassword,
      roleId: role.id,
      hotelId,
    },

    include: {
      role: true,
      hotel: true,
    },
  });
};

export const getStaffByHotel = async (hotelId: string) => {
  return prisma.user.findMany({
    where: {
      hotelId,
      role: {
        roleName: "STAFF",
      },
    },

    include: {
      role: true,
      hotel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStaffById = async (id: string) => {
  const staff = await prisma.user.findUnique({
    where: { id },

    include: {
      role: true,
      hotel: true,
    },
  });

  if (!staff) {
    throw new AppError("Staff not found");
  }

  return staff;
};

export const updateStaff = async (id: string, data: any) => {
  const staff = await prisma.user.findUnique({
    where: { id },
  });

  if (!staff) {
    throw new AppError("Staff not found");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data,

    include: {
      role: true,
      hotel: true,
    },
  });
};

export const deleteStaff = async (id: string) => {
  const staff = await prisma.user.findUnique({
    where: { id },
  });

  if (!staff) {
    throw new AppError("Staff not found");
  }

  await prisma.user.delete({
    where: { id },
  });

  return {
    message: "Staff deleted successfully",
  };
};

export const getAllStaff = async (hotelId?: string) => {
  return prisma.user.findMany({
    where: {
      role: {
        roleName: "STAFF",
      },

      ...(hotelId && {
        hotelId,
      }),
    },

    include: {
      role: true,
      hotel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStaffsByAdmin = async (adminId: string) => {
  const hotels = await prisma.hotel.findMany({
    where: {
      adminId,
    },
    select: {
      id: true,
    },
  });

  const hotelIds = hotels.map((hotel) => hotel.id);

  return prisma.user.findMany({
    where: {
      hotelId: {
        in: hotelIds,
      },

      role: {
        roleName: "STAFF",
      },
    },

    include: {
      role: true,
      hotel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
