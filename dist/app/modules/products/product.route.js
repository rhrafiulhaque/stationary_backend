"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const SendImageToClodinary_1 = require("../../utils/SendImageToClodinary");
const product_controller_1 = require("./product.controller");
const product_validator_1 = require("./product.validator");
const router = express_1.default.Router();
router.post("/create-product", (0, auth_1.default)("admin"), SendImageToClodinary_1.upload.single("image"), (req, res, next) => {
    next();
}, (0, validateRequest_1.default)(product_validator_1.createProductZodSchema), product_controller_1.productControllers.createProduct);
router.get("/all-products", product_controller_1.productControllers.getAllProducts);
router.get("/:productId", product_controller_1.productControllers.getSingleProduct);
router.patch("/:productId", (0, auth_1.default)("admin"), product_controller_1.productControllers.updateProduct);
router.delete("/:productId", (0, auth_1.default)("admin"), product_controller_1.productControllers.deleteProduct);
exports.productRoutes = router;
