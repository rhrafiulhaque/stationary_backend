"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshValidationSchemaZod = exports.userLoginValidationSchemaZod = void 0;
const zod_1 = require("zod");
exports.userLoginValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "email is required" }).email(),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.refreshValidationSchemaZod = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: "refreshToken is required" }),
    }),
});
