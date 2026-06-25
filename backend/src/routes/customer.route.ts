import { Router } from "express";

import * as CustomerController from "../controllers/customer.controller";

import { verifyToken } from "../middlewares/auth.middleware";

import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/my-hotel",
  verifyToken,
  authorize("ADMIN", "STAFF"),
  CustomerController.getMyHotelCustomers,
);

export default router;
