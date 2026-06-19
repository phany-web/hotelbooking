// src/routes/roomType.route.ts

import { Router } from "express";

import * as RoomTypeController from "../controllers/roomType.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  RoomTypeController.create
);

router.get(
  "/",
  RoomTypeController.getAll
);

router.get(
  "/:id",
  RoomTypeController.getOne
);

router.patch(
  "/:id",
  verifyToken,
  RoomTypeController.update
);

router.delete(
  "/:id",
  verifyToken,
  RoomTypeController.remove
);

export default router;