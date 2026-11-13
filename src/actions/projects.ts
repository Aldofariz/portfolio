"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { projectSchema } from "@/lib/validations/project";
import type { ActionResponse } from "@/types/actions";

interface ProjectInputPayload {
  name: string;
  slug: string;
  overview: string;
  live_url?: string | null;
  display_order: number;
  tag_ids: string[];
  media_items: {
    media_id: string;
    is_cover: boolean;
    display_order: number;
  }[];
}

export async function createProjectAction(
  payload: ProjectInputPayload
): Promise<ActionResponse> {
  await requireAdmin();

  const validated = projectSchema.safeParse(payload);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation failed. Please review your project data.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, slug, overview, live_url, display_order, tag_ids, media_items } =
    validated.data;

  const supabase = await createClient();

  // 1. Insert Project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      name,
      slug,
      overview,
      live_url: live_url || null,
      display_order,
    })
    .select()
    .single();

  if (projectError) {
    if (projectError.code === "23505") {
      return {
        success: false,
        error: `A project with the slug "${slug}" already exists. Slugs must be unique.`,
      };
    }
    return {
      success: false,
      error: projectError.message || "Failed to create project.",
    };
  }

  // 2. Insert Tag Associations
  if (tag_ids.length > 0) {
    const tagRows = tag_ids.map((tag_id) => ({
      project_id: project.id,
      tag_id,
    }));
    await supabase.from("project_tags").insert(tagRows);
  }

  // 3. Insert Media Associations
  if (media_items.length > 0) {
    const mediaRows = media_items.map((m) => ({
      project_id: project.id,
      media_id: m.media_id,
      is_cover: m.is_cover,
      display_order: m.display_order,
    }));
    await supabase.from("project_media").insert(mediaRows);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data: project,
    message: "Project created and published immediately.",
  };
}

export async function updateProjectAction(
  id: string,
  payload: ProjectInputPayload
): Promise<ActionResponse> {
  await requireAdmin();

  const validated = projectSchema.safeParse(payload);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation failed. Please review your project data.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, slug, overview, live_url, display_order, tag_ids, media_items } =
    validated.data;

  const supabase = await createClient();

  // 1. Update Project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .update({
      name,
      slug,
      overview,
      live_url: live_url || null,
      display_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (projectError) {
    if (projectError.code === "23505") {
      return {
        success: false,
        error: `A project with the slug "${slug}" already exists. Slugs must be unique.`,
      };
    }
    return {
      success: false,
      error: projectError.message || "Failed to update project.",
    };
  }

  // 2. Sync Tag Associations (delete old, insert new)
  await supabase.from("project_tags").delete().eq("project_id", id);
  if (tag_ids.length > 0) {
    const tagRows = tag_ids.map((tag_id) => ({
      project_id: id,
      tag_id,
    }));
    await supabase.from("project_tags").insert(tagRows);
  }

  // 3. Sync Media Associations (delete old, insert new)
  await supabase.from("project_media").delete().eq("project_id", id);
  if (media_items.length > 0) {
    const mediaRows = media_items.map((m) => ({
      project_id: id,
      media_id: m.media_id,
      is_cover: m.is_cover,
      display_order: m.display_order,
    }));
    await supabase.from("project_media").insert(mediaRows);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data: project,
    message: "Project updated and published immediately.",
  };
}

export async function deleteProjectAction(id: string): Promise<ActionResponse> {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to delete project.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data: null,
    message: "Project deleted successfully.",
  };
}
