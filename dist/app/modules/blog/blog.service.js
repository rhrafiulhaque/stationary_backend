"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate("author"), query)
        .search(blog_constant_1.blogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogQuery.modelQuery;
    return result;
});
const updateBlogByIdToDB = (blogId, userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.Blog.findById(blogId);
    if (!isBlogExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog is not found");
    }
    if (isBlogExist.author.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to update this blog");
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(blogId, updatedData, {
        new: true,
        runValidators: true,
        strict: true,
    });
    return result;
});
const deleteBlogByIdFromDB = (userId, blogId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.Blog.findById(blogId);
    if (!isBlogExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog is not found");
    }
    if (isBlogExist.author.toString() === userId || userRole === "admin") {
        const result = yield blog_model_1.Blog.findByIdAndDelete(blogId);
        return result;
    }
    else {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to delete this blog");
    }
});
exports.blogServices = {
    createBlogIntoDb,
    getAllBlogFromDB,
    updateBlogByIdToDB,
    deleteBlogByIdFromDB,
};
