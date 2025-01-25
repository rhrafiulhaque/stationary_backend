"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateValidationSchemaZod = exports.blogValidationSchemaZod = void 0;
const zod_1 = require("zod");
exports.blogValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        isPublished: zod_1.z.boolean().default(true),
    }),
});
exports.blogUpdateValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: "title must be string",
            required_error: "Title is required",
        })
            .optional(),
        content: zod_1.z
            .string({
            invalid_type_error: "Content must be string",
            required_error: "Content is required",
        })
            .optional(),
        isPublished: zod_1.z
            .boolean({
            invalid_type_error: "isPublished must be string",
            required_error: "isPublished is required",
        })
            .default(true)
            .optional(),
    }),
});
