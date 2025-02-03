"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/get-users", (0, auth_1.default)("admin"), user_controller_1.userControllers.getAllUsers);
router.get("/get-me", (0, auth_1.default)("admin", "user"), user_controller_1.userControllers.getMe);
router.patch("/:userId/block", (0, auth_1.default)("admin"), user_controller_1.userControllers.blockUser);
router.patch("/update-user", (0, auth_1.default)("admin", "user"), user_controller_1.userControllers.updateUser);
exports.UserRoutes = router;
