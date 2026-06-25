import { Router } from "express";

import * as PaymentController from "../controllers/payment.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.post("/", verifyToken, PaymentController.create);

router.get(
  "/",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN", "STAFF"),
  PaymentController.getAll,
);

router.get("/:id", verifyToken, PaymentController.getOne);

router.patch(
  "/:id/status",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  PaymentController.updateStatus,
);

export default router;
