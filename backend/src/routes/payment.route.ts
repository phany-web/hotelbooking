import { Router } from "express";

import * as PaymentController from "../controllers/payment.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyToken, PaymentController.create);

router.get("/", verifyToken, PaymentController.getAll);

router.get("/:id", verifyToken, PaymentController.getOne);

router.patch("/:id/pay", verifyToken, PaymentController.pay);

export default router;
