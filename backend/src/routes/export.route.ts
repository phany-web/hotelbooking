import { Router } from "express";

import * as ExportController from "../controllers/export.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/bookings",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  ExportController.bookingsExcel,
);

export default router;
