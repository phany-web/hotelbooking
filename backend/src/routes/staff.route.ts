import { Router } from "express";
import * as StaffController from "../controllers/staff.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

import * as StaffTaskController from "../controllers/staffTask.controller";

const router = Router();

// Create staff
router.post(
  "/",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.create
);

// Get all staff (admin view)
router.get(
  "/",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.getAll
);

router.get(
  "/dashboard",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.dashboard
);
// Get single staff
router.get(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.getOne
);

// Update staff
router.patch(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.update
);

// Delete staff
router.delete(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.remove
);

export default router;