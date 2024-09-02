import * as z from "zod";
import { authFormSchema } from "@/lib/validations/auth";

export type AuthFormSchema = z.infer<typeof authFormSchema>;

export type RegisterStatus = "success" | "error";

export type RoleType = "user" | "admin" | "manager" | "editor";
