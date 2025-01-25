import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { brandRoutes } from "../modules/brand/brand.route";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/products/product.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/brands",
    route: brandRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
