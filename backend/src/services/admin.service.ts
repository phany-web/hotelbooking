import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const createAdminService = async (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const adminRole = await prisma.role.findFirst({
    where: {
      roleName: "ADMIN",
    },
  });

  if (!adminRole) {
    throw new Error("ADMIN role not found");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

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

export const getAllAdminsService =
  async () => {
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

export const disableAdminService =
  async (id: string) => {
    const admin =
      await prisma.user.findUnique({
        where: { id },
        include: {
          role: true,
        },
      });

    console.log("ADMIN =", admin);

    if (!admin) {
      throw new Error(
        "Admin not found"
      );
    }

    if (
      admin.role.roleName !==
      "ADMIN"
    ) {
      throw new Error(
        "User is not admin"
      );
    }

    return prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  };

export const enableAdminService =
  async (id: string) => {
    const admin =
      await prisma.user.findUnique({
        where: { id },
        include: {
          role: true,
        },
      });

    if (!admin) {
      throw new Error(
        "Admin not found"
      );
    }

    if (
      admin.role.roleName !==
      "ADMIN"
    ) {
      throw new Error(
        "User is not admin"
      );
    }

    return prisma.user.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  };