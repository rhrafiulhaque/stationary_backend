import express from "express";
import validateRequest from "../../middlware/validateRequest";
import { userControllers } from "../user/user.controller";
import { userValidation } from "../user/user.validation";
import { authControllers } from "./auth.controller";
import {
  refreshValidationSchemaZod,
  userLoginValidationSchemaZod,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.userValidationSchemaZod),
  userControllers.createUser
);
router.post(
  "/login",
  validateRequest(userLoginValidationSchemaZod),
  authControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(refreshValidationSchemaZod),
  authControllers.refreshToken
);

export const authRoutes = router;
