import { z } from "zod";

export const experienceSchema = z
  .object({
    position: z
      .string()
      .min(2, "Position must be at least 2 characters.")
      .max(100, "Position must not exceed 100 characters."),
    company: z
      .string()
      .min(2, "Company must be at least 2 characters.")
      .max(100, "Company must not exceed 100 characters."),
    start_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format."),
    end_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format.")
      .nullable()
      .optional()
      .or(z.literal("")),
    is_current: z.boolean().default(false),
    display_order: z.coerce.number().int().min(0).default(0),
  })
  .refine(
    (data) => {
      if (!data.is_current && !data.end_date) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required if this is not your current position.",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      if (data.end_date && data.end_date < data.start_date) {
        return false;
      }
      return true;
    },
    {
      message: "End date cannot be earlier than start date.",
      path: ["end_date"],
    }
  );

export type ExperienceFormData = z.infer<typeof experienceSchema>;
