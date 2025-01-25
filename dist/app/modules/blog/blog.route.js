"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlware/auth"));
const validateRequest_1 = __importDefault(require("../../middlware/validateRequest"));
const user_interface_1 = require("../user/user.interface");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(blog_validation_1.blogValidationSchemaZod), (0, auth_1.default)(user_interface_1.USER_ROLE.user), blog_controller_1.blogControllers.createBlog);
router.get("/", blog_controller_1.blogControllers.getAllBlog);
router.patch("/:blogId", (0, validateRequest_1.default)(blog_validation_1.blogUpdateValidationSchemaZod), (0, auth_1.default)(user_interface_1.USER_ROLE.user), blog_controller_1.blogControllers.updateBlogById);
router.delete("/:blogId", (0, auth_1.default)(user_interface_1.USER_ROLE.user, user_interface_1.USER_ROLE.admin), blog_controller_1.blogControllers.deleteBlogById);
exports.BlogRoutes = router;
