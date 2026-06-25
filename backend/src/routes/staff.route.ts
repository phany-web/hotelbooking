import { Router } from "express";

import * as StaffController from "../controllers/staff.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.post("/", verifyToken, StaffController.create);

router.get("/", verifyToken, StaffController.getAll);

router.get(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.getOne,
);

router.patch(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.update,
);

router.delete(
  "/:id",
  verifyToken,
  authorize("ADMIN", "SUPER_ADMIN"),
  StaffController.remove,
);

export default router;
