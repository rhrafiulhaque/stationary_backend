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
exports.categoryService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constants_1 = require("./category.constants");
const category_model_1 = require("./category.model");
const createCategoryInDB = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const hasCategory = yield category_model_1.Category.findOne({ name: category.name });
    if (hasCategory) {
        throw new Error("The Category already added");
    }
    else {
        const result = yield category_model_1.Category.create(category);
        return result;
    }
});
const getAllCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find(), query)
        .search(category_constants_1.categorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield categoryQuery.countTotal();
    const result = yield categoryQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getCategoryByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    return result;
});
const updateCategoryByIdInDB = (id, updatedName) => __awaiter(void 0, void 0, void 0, function* () {
    const hasCategory = yield category_model_1.Category.findOne({ _id: id });
    if (!hasCategory) {
        throw new Error("There Have No prodcut to update in this ID");
    }
    else {
        const result = yield category_model_1.Category.findByIdAndUpdate(id, {
            name: updatedName,
        }, { new: true });
        return result;
    }
});
const deleteCategoryByIdInDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete(categoryId);
    if (!result) {
        throw new Error("Category not found by this ID");
    }
    else {
        return result;
    }
});
exports.categoryService = {
    createCategoryInDB,
    getAllCategoryFromDB,
    getCategoryByIdFromDB,
    updateCategoryByIdInDB,
    deleteCategoryByIdInDB,
};
