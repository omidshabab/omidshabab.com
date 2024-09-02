import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
