import { Router } from "express";

import * as AdvertisementController from "../controllers/advertisement.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("SUPER_ADMIN"),
  AdvertisementController.create,
);

router.get("/", AdvertisementController.getAll);

router.get("/:id", AdvertisementController.getOne);

router.patch(
  "/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  AdvertisementController.update,
);

router.delete(
  "/:id",
  verifyToken,
  authorize("SUPER_ADMIN"),
  AdvertisementController.remove,
);

export default router;
