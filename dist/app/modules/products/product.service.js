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
exports.productService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constants_1 = require("./product.constants");
const product_model_1 = require("./product.model");
const createProductInDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const hasProduct = yield product_model_1.Product.findOne({ name: product.name });
    if (hasProduct) {
        throw new Error("The Product already added");
    }
    else {
        const result = yield product_model_1.Product.create(product);
        return result;
    }
});
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find().populate("category").populate("brand"), query)
        .search(product_constants_1.productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id)
        .populate("brand")
        .populate("category");
    return result;
});
const updateProductByIdInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const hasProduct = yield product_model_1.Product.findOne({ _id: id });
    if (!hasProduct) {
        throw new Error("There Have No prodcut to update in this ID");
    }
    else {
        const result = yield product_model_1.Product.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { inStock: Number(data.stock) && Number(data.stock) > 0 ? true : false }), { new: true });
        return result;
    }
});
const deleteProductByIdInDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    if (!result) {
        throw new Error("Product not found by this ID");
    }
    else {
        return result;
    }
});
exports.productService = {
    createProductInDB,
    getAllProductFromDB,
    getProductByIdFromDB,
    updateProductByIdInDB,
    deleteProductByIdInDB,
};
