import { z } from "zod";

export const createHotelSchema = z.object({
  hotelName: z.string().min(3).max(100),

  description: z.string().min(10),

  address: z.string().min(5),

  location: z.string().min(2),

  phone: z.string().min(8),

  email: z.email(),

  images: z.array(z.url()).min(1),
});
