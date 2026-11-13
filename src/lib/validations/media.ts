import { z } from "zod";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const mediaMetaSchema = z.object({
  alt_text: z.string().max(255, "Alt text cannot exceed 255 characters.").optional(),
});
