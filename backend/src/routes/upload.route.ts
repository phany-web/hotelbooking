import { Router } from "express";

import { verifyToken }
from "../middlewares/auth.middleware";

import { authorize }
from "../middlewares/authorize.middleware";

import { upload }
from "../middlewares/upload.middleware";

import * as UploadController
from "../controllers/upload.controller";

const router = Router();

router.post(
  "/hotel-image",

  verifyToken,

  authorize(
    "SUPER_ADMIN",
    "ADMIN"
  ),

  upload.single("image"),

  UploadController.uploadHotelImage
);

export default router;