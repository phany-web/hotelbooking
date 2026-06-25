import { Router } from "express";

import * as NotificationController from "../controllers/notification.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/my", verifyToken, NotificationController.myNotifications);

router.get("/unread-count", verifyToken, NotificationController.unreadCount);

router.patch("/read-all", verifyToken, NotificationController.readAll);

router.patch("/:id/read", verifyToken, NotificationController.read);

export default router;
