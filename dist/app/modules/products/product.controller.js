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
exports.productControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const SendImageToClodinary_1 = require("../../utils/SendImageToClodinary");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    product.price = Number(product.price);
    product.quantity = Number(product.quantity);
    let image = null;
    if (req.file) {
        try {
            const uploadResult = (yield (0, SendImageToClodinary_1.sendImageToCloudinary)(req.file.buffer));
            image = uploadResult.secure_url;
        }
        catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Failed to upload photo to Cloudinary");
        }
    }
    product.image = image;
    const result = yield product_service_1.productService.createProductInDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product Created Successfull",
        data: result,
    });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getAllProductFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products are retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.productService.getProductByIdFromDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product is retrieved successfully",
        data: result,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = yield product_service_1.productService.updateProductByIdInDB(productId, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product is updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.productService.deleteProductByIdInDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product is deleted successfully",
        data: result,
    });
}));
exports.productControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
