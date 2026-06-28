import { Router } from "express";

import * as StaffTaskController from "../controllers/staffTask.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";

import { getDashboard } from "../controllers/staffTask.controller";

const router = Router();

router.post("/", verifyToken, StaffTaskController.create);

// router.get(
//   "/dashboard",
//   verifyToken,
//   authorize("STAFF"),
//   StaffTaskController.dashboard,
// );
router.get(
  "/dashboard",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.getDashboard,
);
router.get("/", verifyToken, StaffTaskController.getAll);

router.get("/my-tasks", verifyToken, StaffTaskController.myTasks);
router.patch(
  "/:id/start",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.startTask,
);

router.patch(
  "/:id/complete",
  verifyToken,
  authorize("STAFF"),
  StaffTaskController.completeTask,
);
router.patch("/:id", verifyToken, StaffTaskController.updateStatus);

export default router;
