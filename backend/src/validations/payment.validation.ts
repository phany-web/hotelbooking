import { z } from "zod";

export const createPaymentSchema = z.object({
  bookingId: z.string().uuid(),

  amount: z.number().positive(),

  paymentMethod: z.enum(["CASH", "KHQR", "ABA", "CARD"]),
});
