import bcrypt from "bcrypt";
import prisma from "../config/prisma";

import { AppError } from "../utils/AppError";

export const createAdminService = async (
  fullName: string,
  email: string,
  password: string,
  phone: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("Email already exists");
  }

  const adminRole = await prisma.role.findFirst({
    where: {
      roleName: "ADMIN",
    },
  });

  if (!adminRole) {
    throw new AppError("ADMIN role not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      fullName,
      email,
      phone,
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true,
    },
    include: {
      role: true,
    },
  });

  return admin;
};

export const getAllAdminsService = async () => {
  return prisma.user.findMany({
    where: {
      role: {
        roleName: "ADMIN",
      },
    },
    include: {
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const disableAdminService = async (id: string) => {
  const admin = await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
  });

  console.log("ADMIN =", admin);

  if (!admin) {
    throw new AppError("Admin not found");
  }

  if (admin.role.roleName !== "ADMIN") {
    throw new AppError("User is not admin");
  }

  return prisma.user.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};

export const enableAdminService = async (id: string) => {
  const admin = await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
  });

  if (!admin) {
    throw new AppError("Admin not found");
  }

  if (admin.role.roleName !== "ADMIN") {
    throw new AppError("User is not admin");
  }

  return prisma.user.update({
    where: { id },
    data: {
      isActive: true,
    },
  });
};
