import { Router } from "express";

import * as ReviewController from "../controllers/review.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.post("/", verifyToken, ReviewController.create);

router.get("/", ReviewController.getAll);

router.get("/hotel/:hotelId", ReviewController.getHotelReviews);

router.get("/hotel/:hotelId/rating", ReviewController.rating);

router.delete(
  "/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  ReviewController.remove,
);

export default router;
