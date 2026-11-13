import { requireAdmin } from "@/lib/supabase/auth";
import { AdminNav } from "@/components/admin/nav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <AdminNav userEmail={user.email} />
      <main className="flex-1 p-6 sm:p-10 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
