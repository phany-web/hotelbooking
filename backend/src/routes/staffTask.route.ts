import { Router } from "express";

import * as StaffTaskController from "../controllers/staffTask.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

/**
 * =========================
 * ADMIN ONLY
 * =========================
 */

// Create task (assign staff to room cleaning, etc.)
router.post(
  "/",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffTaskController.create
);

// Get all tasks (admin view)
router.get(
  "/",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffTaskController.getAll
);

/**
 * =========================
 * STAFF ONLY
 * =========================
 */

// Get logged-in staff tasks
router.get(
  "/me",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.myTasks
);

// Start task (change to IN_PROGRESS + room = CLEANING)
router.patch(
  "/:id/start",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.startTask
);

// Complete task (change to COMPLETED + room = AVAILABLE)
router.patch(
  "/:id/complete",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.completeTask
);

/**
 * =========================
 * OPTIONAL (ADMIN VIEW DASHBOARD DATA)
 * =========================
 */

router.get(
  "/dashboard",
  verifyToken,
  authorize("STAFF", "ADMIN"),
  StaffTaskController.dashboard
);

export default router;