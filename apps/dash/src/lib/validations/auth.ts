import * as z from "zod";

export const emailFormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const passwordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const authFormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});
