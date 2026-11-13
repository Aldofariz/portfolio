import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(120, "Project name cannot exceed 120 characters."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(120, "Slug cannot exceed 120 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase alphanumeric characters and hyphens."
    ),
  overview: z
    .string()
    .trim()
    .min(10, "Overview must be at least 10 characters.")
    .max(3000, "Overview cannot exceed 3000 characters."),
  live_url: z
    .string()
    .trim()
    .url("Must be a valid URL.")
    .nullable()
    .optional()
    .or(z.literal("")),
  display_order: z.coerce.number().int().min(0).default(0),
  tag_ids: z.array(z.string().uuid()).default([]),
  media_items: z
    .array(
      z.object({
        media_id: z.string().uuid(),
        is_cover: z.boolean().default(false),
        display_order: z.number().int().min(0).default(0),
      })
    )
    .default([])
    .refine(
      (items) => {
        const coverCount = items.filter((item) => item.is_cover).length;
        return coverCount <= 1;
      },
      {
        message: "A project can have at most one cover image.",
      }
    ),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
