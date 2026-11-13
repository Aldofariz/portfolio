import { z } from "zod";

export function normalizeTagName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

export const tagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tag name cannot be empty.")
    .max(50, "Tag name cannot exceed 50 characters."),
});

export type TagFormData = z.infer<typeof tagSchema>;
