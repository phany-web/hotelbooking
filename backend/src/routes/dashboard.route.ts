import { Router } from "express";
import * as DashboardController from "../controllers/dashboard.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/hotel",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  DashboardController.hotelDashboard,
);

router.get(
  "/recent-bookings",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  DashboardController.recentBookings,
);

router.get(
  "/revenue-chart",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  DashboardController.revenueChart,
);

router.get(
  "/system",
  verifyToken,
  authorize("SUPER_ADMIN"),
  DashboardController.systemDashboard
);

router.get(
  "/housekeeping/:hotelId",
  verifyToken,
  authorize(
    "ADMIN",
    "STAFF"
  ),
  DashboardController.housekeeping
);
export default router;
