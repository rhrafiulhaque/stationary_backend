import { z } from "zod";

export const createBrandZodSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
  }),
});

export const updateBrandZodSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").optional(),
  })
  .strict();
