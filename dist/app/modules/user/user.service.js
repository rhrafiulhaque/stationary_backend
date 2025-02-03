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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_constants_1 = require("../products/product.constants");
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ email: payload.email });
    if (userExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Email Already Exist");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(product_constants_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getMeFromDB = (requesteUserEmail, requseteUserRole) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: requesteUserEmail });
    if (requseteUserRole !== user.role || requesteUserEmail !== user.email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are not Authorized to access this user");
    }
    return user;
});
const blockUserToDB = (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not found");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: userId }, { isBlocked: isBlocked }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const updateUserData = (requesteUserEmail, requseteUserRole, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ email: requesteUserEmail });
    if (requseteUserRole !== userExist.role ||
        requesteUserEmail !== userExist.email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are not Authorized to Update this user");
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ email: userExist.email }, {
        name: updateData.name,
        phone: updateData.phone,
        address: updateData.address,
    }, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getMeFromDB,
    blockUserToDB,
    updateUserData,
};
