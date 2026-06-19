import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    hotelId?: string | null;
  };
}