import { z } from "zod";

export const createProductZodSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    brand: z.string().trim().min(1, "Brand is required"),
    price: z.string().min(0, "Price must be a positive number"),
    category: z.string().trim().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    stock: z.string().min(0, "stock must be a non-negative number"),
  }),
});

export const updateProductZodSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").optional(),
    brand: z.string().trim().min(1, "Brand is required").optional(),
    price: z.string().min(0, "Price must be a positive number").optional(),
    category: z.string().trim().min(1, "Category is required"),
    description: z.string().optional(),
    stock: z.string().min(0, "stock must be a non-negative number").optional(),
  })
  .strict();
