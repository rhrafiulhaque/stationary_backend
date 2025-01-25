import { z } from "zod";

export const userLoginValidationSchemaZod = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});
export const refreshValidationSchemaZod = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "refreshToken is required" }),
  }),
});
