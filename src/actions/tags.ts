"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { tagSchema, normalizeTagName } from "@/lib/validations/tag";
import type { ActionResponse } from "@/types/actions";

export async function createTagAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAdmin();

  const rawName = formData.get("name");
  const validated = tagSchema.safeParse({ name: rawName });

  if (!validated.success) {
    return {
      success: false,
      error: "Validation error.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const name = validated.data.name;
  const normalized_name = normalizeTagName(name);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .insert({
      name,
      normalized_name,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: `A tag with the normalized name "${normalized_name}" already exists.`,
      };
    }
    return {
      success: false,
      error: error.message || "Failed to create tag.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/tags");
  revalidatePath("/admin/projects");

  return {
    success: true,
    data,
    message: "Tag created successfully.",
  };
}

export async function deleteTagAction(id: string): Promise<ActionResponse> {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase.from("tags").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to delete tag.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/tags");
  revalidatePath("/admin/projects");

  return {
    success: true,
    data: null,
    message: "Tag deleted successfully.",
  };
}
