import { Router } from "express";
import * as HotelController from "../controllers/hotel.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validate.middleware";

import { createHotelSchema } from "../validations/hotel.validation";

const router = Router();

router.get("/search", HotelController.search);

router.get("/top-hotels", HotelController.topHotels);

router.get("/public", HotelController.getPublicHotels);

router.get("/:id", HotelController.getOne);

router.post(
  "/",
  verifyToken,
  authorize("ADMIN"),
  validate(createHotelSchema),
  HotelController.create
);

router.get(
  "/",
  verifyToken,
  HotelController.getAll
);

router.get(
  "/my-hotels",
  verifyToken,
  HotelController.getMyHotels
);

router.patch(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  HotelController.update
);

router.delete(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  HotelController.remove
);

export default router;