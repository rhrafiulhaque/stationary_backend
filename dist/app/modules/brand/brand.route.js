"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const brand_controller_1 = require("./brand.controller");
const brand_validator_1 = require("./brand.validator");
const router = express_1.default.Router();
router.post("/create-brand", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(brand_validator_1.createBrandZodSchema), brand_controller_1.brandControllers.createBrand);
router.get("/all-brands", brand_controller_1.brandControllers.getAllBrands);
router.get("/:brandId", brand_controller_1.brandControllers.getSingleBrand);
router.patch("/:brandId", (0, auth_1.default)("admin"), brand_controller_1.brandControllers.updateBrand);
router.delete("/:brandId", (0, auth_1.default)("admin"), brand_controller_1.brandControllers.deleteBrand);
exports.brandRoutes = router;
