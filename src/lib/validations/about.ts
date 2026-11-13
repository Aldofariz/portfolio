import { z } from "zod";

export const aboutSchema = z.object({
  introduction: z
    .string()
    .min(10, "Introduction must be at least 10 characters.")
    .max(2500, "Introduction must not exceed 2500 characters."),
  profile_media_id: z.string().uuid().nullable().optional(),
});

export type AboutFormData = z.infer<typeof aboutSchema>;
