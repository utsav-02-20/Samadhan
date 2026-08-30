import { z } from "zod";

export const createGovernmentSchema = z.object({
  name: z
    .string()
    .min(2, "Government name must contain at least 2 characters")
    .max(100),

  code: z
    .string()
    .min(2)
    .max(20)
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Government code can contain only letters, numbers, _ and -"
    ),

  description: z
    .string()
    .max(500)
    .optional(),

  state: z
    .string()
    .min(2)
    .max(100),

  contactEmail: z
    .email(),

  contactPhone: z
    .string()
    .max(20)
    .optional(),

  status: z
    .enum(["ACTIVE", "INACTIVE"])
    .optional(),
});
