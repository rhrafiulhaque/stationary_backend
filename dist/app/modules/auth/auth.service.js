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
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const user_model_1 = require("../user/user.model");
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Email Not Found");
    }
    const isBlocked = userExist === null || userExist === void 0 ? void 0 : userExist.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This User has been blocked");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, userExist === null || userExist === void 0 ? void 0 : userExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password Do not Match");
    }
    const token = (0, jwt_1.default)(userExist);
    return token;
});
const refreshTokenFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Please Login First");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const userExist = yield user_model_1.User.findOne({ email: decoded.email });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Email Not Found");
    }
    const isBlocked = userExist === null || userExist === void 0 ? void 0 : userExist.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This User has been blocked");
    }
    const result = (0, jwt_1.default)(userExist);
    return {
        accessToken: result.accessToken,
    };
});
exports.authServices = {
    loginUserIntoDB,
    refreshTokenFromDB,
};
