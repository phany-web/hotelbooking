import { z } from "zod";

export const bookingSchema = z.object({
  roomId: z.uuid(),

  checkInDate: z.iso.datetime(),

  checkOutDate: z.iso.datetime(),
});