import { Router } from "express";

import { createAdmin, getAllAdmins, disableAdmin, enableAdmin } from "../controllers/admin.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.post(
  "/create-admin",
  verifyToken,
  authorize("SUPER_ADMIN"),
  createAdmin,
);

router.get(
  "/all-admins",
  verifyToken,
  authorize("SUPER_ADMIN"),
  getAllAdmins
);

router.patch(
  "/disable/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  disableAdmin
);

router.patch(
  "/enable/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  enableAdmin
)
export default router;
