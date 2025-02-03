"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandZodSchema = exports.createBrandZodSchema = void 0;
const zod_1 = require("zod");
exports.createBrandZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, "Name is required"),
    }),
});
exports.updateBrandZodSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Name is required").optional(),
})
    .strict();
