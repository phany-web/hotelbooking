import { Router } from "express";

import * as ReportController from "../controllers/report.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/revenue",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  ReportController.revenue,
);

router.get(
  "/daily-revenue",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  ReportController.dailyRevenue,
);

router.get(
  "/monthly-revenue",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  ReportController.monthlyRevenue,
);
export default router;
