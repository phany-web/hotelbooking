import { Router } from "express";

import * as AuditLogController from "../controllers/auditLog.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  AuditLogController.getAll,
);

export default router;
