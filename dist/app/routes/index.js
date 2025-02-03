"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const brand_route_1 = require("../modules/brand/brand.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const product_route_1 = require("../modules/products/product.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/products",
        route: product_route_1.productRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/brands",
        route: brand_route_1.brandRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.orderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
