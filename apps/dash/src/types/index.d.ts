import * as z from "zod";
import {
  emailFormSchema,
  passwordFormSchema,
  authFormSchema,
} from "@/lib/validations/auth";

export type AuthFormEmailSchema = z.infer<typeof emailFormSchema>;
export type AuthFormPasswordSchema = z.infer<typeof passwordFormSchema>;
export type AuthFormSchema = z.infer<typeof authFormSchema>;

export type RegisterStatus = "success" | "error";
