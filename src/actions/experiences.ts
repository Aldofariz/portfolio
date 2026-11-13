"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";
import { experienceSchema } from "@/lib/validations/experience";
import type { ActionResponse } from "@/types/actions";

export async function createExperienceAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAdmin();

  const raw = {
    position: formData.get("position"),
    company: formData.get("company"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    is_current: formData.get("is_current") === "true" || formData.get("is_current") === "on",
    display_order: formData.get("display_order") || 0,
  };

  const validated = experienceSchema.safeParse(raw);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation error. Please check form fields.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { position, company, start_date, end_date, is_current, display_order } =
    validated.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiences")
    .insert({
      position,
      company,
      start_date,
      end_date: is_current ? null : end_date || null,
      is_current,
      display_order,
    })
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to create experience record.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data,
    message: "Experience record created successfully.",
  };
}

export async function updateExperienceAction(
  id: string,
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await requireAdmin();

  const raw = {
    position: formData.get("position"),
    company: formData.get("company"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    is_current: formData.get("is_current") === "true" || formData.get("is_current") === "on",
    display_order: formData.get("display_order") || 0,
  };

  const validated = experienceSchema.safeParse(raw);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation error. Please check form fields.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { position, company, start_date, end_date, is_current, display_order } =
    validated.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiences")
    .update({
      position,
      company,
      start_date,
      end_date: is_current ? null : end_date || null,
      is_current,
      display_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to update experience record.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data,
    message: "Experience record updated successfully.",
  };
}

export async function deleteExperienceAction(id: string): Promise<ActionResponse> {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message || "Failed to delete experience record.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    data: null,
    message: "Experience record deleted successfully.",
  };
}
