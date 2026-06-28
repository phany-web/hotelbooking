import { Router } from "express";

import * as BookingController from "../controllers/booking.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { validate } from "../middlewares/validate.middleware";
import { authorize } from "../middlewares/authorize.middleware";
const router = Router();

import { bookingSchema } from "../validations/booking.validation";

router.post(
  "/",
  verifyToken,
  validate(bookingSchema),
  BookingController.create,
);

router.get(
  "/",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  BookingController.getAll,
);

router.get("/my-bookings", verifyToken, BookingController.myBookings);

router.get(
  "/my-hotel",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  BookingController.getMyHotelBookings,
);

router.get("/:id", verifyToken, BookingController.getOne);

router.patch("/:id/cancel", verifyToken, BookingController.cancel);

router.post(
  "/:id/confirm",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  BookingController.confirm,
);

router.post(
  "/:id/check-in",
  verifyToken,
  authorize("ADMIN", "STAFF", "SUPER_ADMIN"),
  BookingController.checkIn,
);

router.post(
  "/:id/check-out",
  verifyToken,
  authorize("ADMIN", "STAFF", "SUPER_ADMIN"),
  BookingController.checkOut,
);

export default router;
