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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenWitBearer = req.headers.authorization;
        const token = tokenWitBearer === null || tokenWitBearer === void 0 ? void 0 : tokenWitBearer.split(" ")[1];
        if (!token) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Please Login First"));
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            if (err.name === "TokenExpiredError") {
                return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "JWT Token has expired"));
            }
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Token"));
        }
        const role = decoded.role;
        const userExist = yield user_model_1.User.findOne({ email: decoded.email });
        if (!userExist) {
            return next(new AppError_1.default(http_status_1.default.NOT_FOUND, "Email Not Found"));
        }
        const isBlocked = userExist === null || userExist === void 0 ? void 0 : userExist.isBlocked;
        if (isBlocked) {
            return next(new AppError_1.default(http_status_1.default.FORBIDDEN, "This User has been blocked"));
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not Authorized"));
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
