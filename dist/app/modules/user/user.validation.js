"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Name is required"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password cannot exceed 20 characters"),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
    }),
});
exports.userValidation = {
    userValidationSchemaZod,
};
