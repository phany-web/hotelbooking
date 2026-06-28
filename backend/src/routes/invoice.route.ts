import { Router } from "express";

import * as InvoiceController from "../controllers/invoice.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:paymentId", verifyToken, InvoiceController.downloadInvoice);

export default router;
