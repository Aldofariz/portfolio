"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/validations/media";
import type { ActionResponse } from "@/types/actions";
import type { Media } from "@/types/database";

export async function uploadMediaAction(formData: FormData): Promise<ActionResponse<Media>> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const altText = (formData.get("alt_text") as string) || null;

  if (!file || !(file instanceof File) || file.size === 0) {
    return {
      success: false,
      error: "Please select an image file to upload.",
    };
  }

  // Validate MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Invalid file format (${file.type}). Allowed formats: JPEG, PNG, WebP, GIF.`,
    };
  }

  // Validate size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "File size exceeds the 5MB limit.",
    };
  }

  const supabase = await createClient();

  // Create unique storage path
  const sanitizedOriginal = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueId = crypto.randomUUID();
  const storagePath = `media/${uniqueId}-${sanitizedOriginal}`;

  // Upload to Supabase Storage
  const buffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("portfolio-media")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return {
      success: false,
      error: `Storage upload failed: ${uploadError.message}`,
    };
  }

  // Insert metadata into media table
  const { data: mediaRecord, error: dbError } = await supabase
    .from("media")
    .insert({
      storage_path: storagePath,
      original_filename: file.name,
      mime_type: file.type,
      file_size: file.size,
      alt_text: altText,
    })
    .select()
    .single();

  if (dbError) {
    // Attempt cleanup of orphaned storage file
    await supabase.storage.from("portfolio-media").remove([storagePath]);
    return {
      success: false,
      error: `Database registration failed: ${dbError.message}`,
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/media");
  revalidatePath("/admin/about");
  revalidatePath("/admin/projects");

  return {
    success: true,
    data: mediaRecord as Media,
    message: "Image uploaded successfully.",
  };
}

export async function deleteMediaAction(mediaId: string): Promise<ActionResponse> {
  await requireAdmin();

  const supabase = await createClient();

  // Check if media is referenced in about table
  const { data: aboutRef } = await supabase
    .from("about")
    .select("id")
    .eq("profile_media_id", mediaId)
    .maybeSingle();

  if (aboutRef) {
    return {
      success: false,
      error: "Cannot delete image: It is currently active as the About profile photo. Replace it first.",
    };
  }

  // Check if media is referenced in project_media table
  const { data: projectRef } = await supabase
    .from("project_media")
    .select("project_id")
    .eq("media_id", mediaId)
    .limit(1);

  if (projectRef && projectRef.length > 0) {
    return {
      success: false,
      error: "Cannot delete image: It is currently attached to one or more projects. Detach it first.",
    };
  }

  // Fetch storage path
  const { data: mediaRecord } = await supabase
    .from("media")
    .select("storage_path")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaRecord) {
    // Remove from storage
    await supabase.storage.from("portfolio-media").remove([mediaRecord.storage_path]);
  }

  // Remove from database
  const { error: deleteError } = await supabase
    .from("media")
    .delete()
    .eq("id", mediaId);

  if (deleteError) {
    return {
      success: false,
      error: deleteError.message || "Failed to delete media record.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/media");

  return {
    success: true,
    data: null,
    message: "Image deleted successfully.",
  };
}
