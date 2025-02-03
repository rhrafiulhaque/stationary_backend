"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post("/create-blog", (0, validateRequest_1.default)(blog_validation_1.blogValidationSchemaZod), (0, auth_1.default)("admin"), blog_controller_1.blogControllers.createBlog);
router.get("/all-blogs", blog_controller_1.blogControllers.getAllBlog);
router.get("/:blogId", blog_controller_1.blogControllers.getSingleBlog);
router.patch("/:blogId", (0, validateRequest_1.default)(blog_validation_1.blogUpdateValidationSchemaZod), (0, auth_1.default)("admin"), blog_controller_1.blogControllers.updateBlogById);
router.delete("/:blogId", (0, auth_1.default)("admin"), blog_controller_1.blogControllers.deleteBlogById);
exports.BlogRoutes = router;
