"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validator_1 = require("./category.validator");
const router = express_1.default.Router();
router.post("/create-category", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(category_validator_1.createCategoryZodSchema), category_controller_1.categoryControllers.createCategory);
router.get("/all-categories", category_controller_1.categoryControllers.getAllCategories);
router.get("/:catId", category_controller_1.categoryControllers.getSingleCategory);
router.patch("/:catId", (0, auth_1.default)("admin"), category_controller_1.categoryControllers.updateCategory);
router.delete("/:catId", (0, auth_1.default)("admin"), category_controller_1.categoryControllers.deleteCategory);
exports.categoryRoutes = router;
