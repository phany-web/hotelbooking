import { Router } from "express";

import * as HotelController from "../controllers/hotel.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validate.middleware";

import { createHotelSchema } from "../validations/hotel.validation";

const router = Router();

router.get("/search", HotelController.search);

router.post(
  "/",
  verifyToken,
  authorize("ADMIN"),
  validate(createHotelSchema),
  HotelController.create,
);
router.post(
  "/",
  verifyToken,
  authorize("ADMIN"),

  validate(createHotelSchema),

  HotelController.create,
);

router.get("/", HotelController.getAll);

router.get("/:id", HotelController.getOne);

router.patch(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  HotelController.update,
);

router.delete(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  HotelController.remove,
);

router.get("/top-hotels", HotelController.topHotels);
export default router;
