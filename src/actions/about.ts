"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { aboutSchema } from "@/lib/validations/about";
import type { ActionResponse } from "@/types/actions";

export async function updateAboutAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAdmin();

  const raw = {
    introduction: formData.get("introduction"),
    profile_media_id: formData.get("profile_media_id") || null,
  };

  const validated = aboutSchema.safeParse(raw);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation error. Please verify the introduction content.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { introduction, profile_media_id } = validated.data;
  const supabase = await createClient();

  // Check if singleton row exists
  const { data: existing } = await supabase
    .from("about")
    .select("id")
    .maybeSingle();

  let error;
  let data;

  if (existing) {
    const res = await supabase
      .from("about")
      .update({
        introduction,
        profile_media_id: profile_media_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();
    data = res.data;
    error = res.error;
  } else {
    const res = await supabase
      .from("about")
      .insert({
        introduction,
        profile_media_id: profile_media_id || null,
        is_singleton: true,
      })
      .select()
      .single();
    data = res.data;
    error = res.error;
  }

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to save About section.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/about");

  return {
    success: true,
    data,
    message: "About section updated and published immediately.",
  };
}
