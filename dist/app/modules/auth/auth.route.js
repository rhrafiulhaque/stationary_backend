"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationSchemaZod), user_controller_1.userControllers.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.userLoginValidationSchemaZod), auth_controller_1.authControllers.loginUser);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.refreshValidationSchemaZod), auth_controller_1.authControllers.refreshToken);
exports.authRoutes = router;
