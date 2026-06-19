import { Router } from "express";

import * as UserController from "../controllers/user.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("SUPER_ADMIN"),
  UserController.getAllUsers,
);

router.get(
  "/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  UserController.getUserById,
);

router.patch(
  "/disable/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  UserController.disableUser,
);

router.patch(
  "/enable/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  UserController.enableUser,
);

export default router;