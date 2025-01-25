import express from "express";
import auth from "../../middlware/auth";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/get-users", auth("admin"), userControllers.getAllUsers);
router.get("/get-me", auth("admin", "user"), userControllers.getMe);
router.patch("/:userId/block", auth("admin"), userControllers.blockUser);
router.patch("/update-user", auth("admin", "user"), userControllers.updateUser);
export const UserRoutes = router;
