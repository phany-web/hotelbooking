import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";

import * as PaymentController from "../controllers/payment.controller";

const router = Router();

router.post("/", PaymentController.create);

router.get("/", PaymentController.getAll);

router.patch("/:id/paid", PaymentController.paid);

router.post(
  "/:bookingId/generate-khqr",
  verifyToken,
  PaymentController.generateKHQR,
);

export default router;
