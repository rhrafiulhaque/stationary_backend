import express from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { brandControllers } from "./brand.controller";
import { createBrandZodSchema } from "./brand.validator";

const router = express.Router();

router.post(
  "/create-brand",
  auth("admin"),
  validateRequest(createBrandZodSchema),
  brandControllers.createBrand
);
router.get("/all-brands", brandControllers.getAllBrands);
router.get("/:brandId", brandControllers.getSingleBrand);
router.patch("/:brandId", auth("admin"), brandControllers.updateBrand);
router.delete("/:brandId", auth("admin"), brandControllers.deleteBrand);

export const brandRoutes = router;
