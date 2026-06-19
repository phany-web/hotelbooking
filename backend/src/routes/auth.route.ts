import { Router } from "express";

import * as AuthController from "../controllers/auth.controller";

import { validate } from "../middlewares/validate.middleware";

import { loginSchema } from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);

router.post("/refresh", AuthController.refresh);

export default router;
