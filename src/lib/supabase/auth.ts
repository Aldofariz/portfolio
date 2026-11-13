import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function checkIsAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  return true;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    redirect("/admin/login?error=unauthorized");
  }

  return user;
}
