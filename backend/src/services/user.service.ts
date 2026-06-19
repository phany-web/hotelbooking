import prisma from "../config/prisma";

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    include: {
      role: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },

    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const disableUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },

    data: {
      isActive: false,
    },
  });
};

export const enableUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },

    data: {
      isActive: true,
    },
  });
};
