import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const createStaff = async (
  fullName: string,
  email: string,
  phone: string,
  password: string,
  hotelId: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const role = await prisma.role.findUnique({
    where: {
      roleName: "STAFF",
    },
  });

  if (!role) {
    throw new Error("STAFF role not found");
  }

  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });

  if (!hotel) {
    throw new Error("Hotel not found");
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

export const getAllStaff = async () => {
  return prisma.user.findMany({
    where: {
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
    throw new Error("Staff not found");
  }

  return staff;
};

export const updateStaff = async (id: string, data: any) => {
  const staff = await prisma.user.findUnique({
    where: { id },
  });

  if (!staff) {
    throw new Error("Staff not found");
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
    throw new Error("Staff not found");
  }

  await prisma.user.delete({
    where: { id },
  });

  return {
    message: "Staff deleted successfully",
  };
};
