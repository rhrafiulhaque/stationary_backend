import { z } from "zod";

export const blogValidationSchemaZod = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    isPublished: z.boolean().default(true),
  }),
});
export const blogUpdateValidationSchemaZod = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "title must be string",
        required_error: "Title is required",
      })
      .optional(),
    content: z
      .string({
        invalid_type_error: "Content must be string",
        required_error: "Content is required",
      })
      .optional(),
    isPublished: z
      .boolean({
        invalid_type_error: "isPublished must be string",
        required_error: "isPublished is required",
      })
      .default(true)
      .optional(),
  }),
});
