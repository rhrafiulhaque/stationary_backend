import express from "express";
import auth from "../../middlware/auth";
import validateRequest from "../../middlware/validateRequest";
import { blogControllers } from "./blog.controller";
import {
  blogUpdateValidationSchemaZod,
  blogValidationSchemaZod,
} from "./blog.validation";

const router = express.Router();

router.post(
  "/create-blog",
  validateRequest(blogValidationSchemaZod),
  auth("admin"),
  blogControllers.createBlog
);

router.get("/all-blogs", blogControllers.getAllBlog);
router.get("/:blogId", blogControllers.getSingleBlog);
router.patch(
  "/:blogId",
  validateRequest(blogUpdateValidationSchemaZod),
  auth("admin"),
  blogControllers.updateBlogById
);
router.delete("/:blogId", auth("admin"), blogControllers.deleteBlogById);

export const BlogRoutes = router;
