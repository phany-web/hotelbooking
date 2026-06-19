import { Router } from "express";

import * as NotificationController from "../controllers/notification.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/my", verifyToken, NotificationController.myNotifications);

router.get("/unread-count", verifyToken, NotificationController.unread);

router.patch("/:id/read", verifyToken, NotificationController.read);

router.delete("/:id", verifyToken, NotificationController.remove);

export default router;
