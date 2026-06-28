import { z } from "zod";

export const bookingSchema = z.object({
  roomId: z.uuid(),

  checkInDate: z.iso.datetime(),

  checkOutDate: z.iso.datetime(),
  checkInBookingSchema: z.iso.datetime(),
checkOutBookingSchema: z.iso.datetime(),
confirmBookingSchema: z.iso.datetime(),
cancelBookingSchema: z.iso.datetime(),
});
export const bookingIdSchema = z.object({
  id: z.string().uuid(),
});