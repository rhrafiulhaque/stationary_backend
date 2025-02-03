"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/create-order", (0, auth_1.default)("user"), order_controller_1.orderController.createOrder);
router.get("/verify", order_controller_1.orderController.verifyPayment);
router.get("/all-orders", (0, auth_1.default)("user", "admin"), order_controller_1.orderController.getAllOrder);
router.patch("/:orderId", (0, auth_1.default)("admin"), order_controller_1.orderController.updateOrderStatus);
// router.delete("/:productId", auth("admin"), productControllers.deleteProduct);
exports.orderRoutes = router;
