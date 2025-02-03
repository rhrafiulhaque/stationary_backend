import express from "express";
import auth from "../../middlware/auth";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", auth("user"), orderController.createOrder);
router.get("/verify", orderController.verifyPayment);
router.get("/all-orders", auth("user", "admin"), orderController.getAllOrder);
router.patch("/:orderId", auth("admin"), orderController.updateOrderStatus);
// router.delete("/:productId", auth("admin"), productControllers.deleteProduct);

export const orderRoutes = router;
