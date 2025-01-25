import { z } from "zod";

export const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});

export const updateCategoryZodSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").optional(),
  })
  .strict();
