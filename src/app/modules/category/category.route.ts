import express from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { categoryControllers } from "./category.controller";
import { createCategoryZodSchema } from "./category.validator";

const router = express.Router();

router.post(
  "/create-category",
  auth("admin"),
  validateRequest(createCategoryZodSchema),
  categoryControllers.createCategory
);
router.get("/all-categories", categoryControllers.getAllCategories);
router.get("/:catId", categoryControllers.getSingleCategory);
router.patch("/:catId", auth("admin"), categoryControllers.updateCategory);
router.delete("/:catId", auth("admin"), categoryControllers.deleteCategory);

export const categoryRoutes = router;
