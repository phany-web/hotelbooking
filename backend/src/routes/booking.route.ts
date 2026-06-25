import { Router } from "express";

import * as BookingController from "../controllers/booking.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { validate } from "../middlewares/validate.middleware";

const router = Router();

import { bookingSchema } from "../validations/booking.validation";

router.post(
  "/",
  verifyToken,

  validate(bookingSchema),

  BookingController.create,
);

router.get("/", verifyToken, BookingController.getAll);

router.get("/my-bookings", verifyToken, BookingController.myBookings);

router.get("/:id", verifyToken, BookingController.getOne);

router.patch("/:id/cancel", verifyToken, BookingController.cancel);

router.patch("/:id/check-in", verifyToken, BookingController.checkIn);

router.patch("/:id/check-out", verifyToken, BookingController.checkOut);

router.get("/my-hotel", verifyToken, BookingController.getMyHotelBookings);
export default router;
