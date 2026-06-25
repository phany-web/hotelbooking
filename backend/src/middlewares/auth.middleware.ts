import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { AuthRequest } from "../types/express";

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("JWT_SECRET =", JWT_SECRET);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER =", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN =", token);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("DECODED =", decoded);

    req.user = decoded as any;

    next();
  } catch (error) {
    console.log("JWT ERROR =", error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};