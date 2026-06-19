import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

import { JWT_SECRET, REFRESH_SECRET } from "../config/env";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },

    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("USER NOT FOUND");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("PASSWORD NOT MATCH");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role.roleName,
      hotelId: user.hotelId,
    },

    JWT_SECRET,

    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },

    REFRESH_SECRET,

    {
      expiresIn: "30d",
    },
  );

  const { password: _, ...safeUser } = user;

  return {
    accessToken,
    refreshToken,
    user: safeUser,
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as {
    userId: string;
  };

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },

    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("USER NOT FOUND");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      role: user.role.roleName,
      hotelId: user.hotelId,
    },

    JWT_SECRET,

    {
      expiresIn: "15m",
    },
  );

  return {
    accessToken,
  };
};
