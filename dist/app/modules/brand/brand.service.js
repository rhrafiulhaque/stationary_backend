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
exports.brandService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const brand_constants_1 = require("./brand.constants");
const brand_model_1 = require("./brand.model");
const createBrandInDB = (brand) => __awaiter(void 0, void 0, void 0, function* () {
    const hasBrand = yield brand_model_1.Brand.findOne({ name: brand.name });
    if (hasBrand) {
        throw new Error("The Brand already added");
    }
    else {
        const result = yield brand_model_1.Brand.create(brand);
        return result;
    }
});
const getAllBrandFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const brandQuery = new QueryBuilder_1.default(brand_model_1.Brand.find(), query)
        .search(brand_constants_1.brandSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield brandQuery.countTotal();
    const result = yield brandQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getBrandByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_model_1.Brand.findById(id);
    return result;
});
const updateBrandByIdInDB = (id, updatedName) => __awaiter(void 0, void 0, void 0, function* () {
    const hasBrand = yield brand_model_1.Brand.findOne({ _id: id });
    if (!hasBrand) {
        throw new Error("There Have No brand to update in this ID");
    }
    else {
        const result = yield brand_model_1.Brand.findByIdAndUpdate(id, {
            name: updatedName,
        }, { new: true });
        return result;
    }
});
const deleteBrandByIdInDB = (brandId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_model_1.Brand.findByIdAndDelete(brandId);
    if (!result) {
        throw new Error("Brand not found by this ID");
    }
    else {
        return result;
    }
});
exports.brandService = {
    createBrandInDB,
    getAllBrandFromDB,
    getBrandByIdFromDB,
    updateBrandByIdInDB,
    deleteBrandByIdInDB,
};
