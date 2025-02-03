import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { upload } from "../../utils/SendImageToClodinary";
import { productControllers } from "./product.controller";
import { createProductZodSchema } from "./product.validator";

const router = express.Router();

router.post(
  "/create-product",
  auth("admin"),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  validateRequest(createProductZodSchema),
  productControllers.createProduct
);
router.get("/all-products", productControllers.getAllProducts);
router.get("/:productId", productControllers.getSingleProduct);
router.patch("/:productId", auth("admin"), productControllers.updateProduct);
router.delete("/:productId", auth("admin"), productControllers.deleteProduct);

export const productRoutes = router;
