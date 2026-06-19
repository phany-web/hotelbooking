import { Router } from "express";

import * as DashboardController from "../controllers/dashboard.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/system",
  verifyToken,
  authorize("SUPER_ADMIN"),
  DashboardController.systemDashboard,
);

router.get(
  "/hotel",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN", "STAFF"),
  DashboardController.hotelDashboard,
);

router.get(
  "/recent-bookings",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  DashboardController.recentBookings,
);
export default router;
