"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductZodSchema = exports.createProductZodSchema = void 0;
const zod_1 = require("zod");
exports.createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, "Name is required"),
        brand: zod_1.z.string().trim().min(1, "Brand is required"),
        price: zod_1.z.string().min(0, "Price must be a positive number"),
        category: zod_1.z.string().trim().min(1, "Category is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        stock: zod_1.z.string().min(0, "stock must be a non-negative number"),
    }),
});
exports.updateProductZodSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Name is required").optional(),
    brand: zod_1.z.string().trim().min(1, "Brand is required").optional(),
    price: zod_1.z.string().min(0, "Price must be a positive number").optional(),
    category: zod_1.z.string().trim().min(1, "Category is required"),
    description: zod_1.z.string().optional(),
    stock: zod_1.z.string().min(0, "stock must be a non-negative number").optional(),
})
    .strict();
