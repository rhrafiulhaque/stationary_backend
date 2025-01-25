"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generateToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expiresin,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expiresin,
    });
    return { accessToken, refreshToken };
};
exports.default = generateToken;
