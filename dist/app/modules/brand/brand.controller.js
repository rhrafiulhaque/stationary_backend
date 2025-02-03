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
exports.brandControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const brand_service_1 = require("./brand.service");
const createBrand = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_service_1.brandService.createBrandInDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brand Created Successfull",
        data: result,
    });
}));
const getAllBrands = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_service_1.brandService.getAllBrandFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brands are retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandId } = req.params;
    const result = yield brand_service_1.brandService.getBrandByIdFromDB(brandId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brand is retrieved successfully",
        data: result,
    });
}));
const updateBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandId } = req.params;
    const updatedName = req.body.name;
    const result = yield brand_service_1.brandService.updateBrandByIdInDB(brandId, updatedName);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brand is updated successfully",
        data: result,
    });
}));
const deleteBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandId } = req.params;
    const result = yield brand_service_1.brandService.deleteBrandByIdInDB(brandId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brand is deleted successfully",
        data: result,
    });
}));
exports.brandControllers = {
    createBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
};
