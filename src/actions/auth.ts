"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";
import type { ActionResponse } from "@/types/actions";

export async function loginAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  const validated = loginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!validated.success) {
    return {
      success: false,
      error: "Validation error. Please check your credentials.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;
  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    return {
      success: false,
      error: authError?.message || "Invalid email or password.",
    };
  }

  // Security check: Verify allowlist membership in admin_users
  const { data: adminRecord, error: adminCheckError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", authData.user.id)
    .maybeSingle();

  if (adminCheckError || !adminRecord) {
    // Force sign out unauthorized account
    await supabase.auth.signOut();
    return {
      success: false,
      error:
        "Access denied. Your account is not authorized in the administrator allowlist.",
    };
  }

  // Successful login & authorized admin
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
