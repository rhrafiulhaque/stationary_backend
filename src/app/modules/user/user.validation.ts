import { z } from "zod";

const userValidationSchemaZod = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.number(),
    profilePhoto: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
    role: z.enum(["admin", "user"]).default("user"),
  }),
});

export const userValidation = {
  userValidationSchemaZod,
};
