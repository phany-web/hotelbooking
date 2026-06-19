import { z } from "zod";

export const reviewSchema = z.object({
  hotelId: z.uuid(),

  rating: z.number().min(1).max(5),

  comment: z.string().min(3).max(1000),
});
