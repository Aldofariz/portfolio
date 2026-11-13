import { createClient } from "@/lib/supabase/server";
import { ExperiencesManager } from "@/components/admin/experiences-manager";
import type { Experience } from "@/types/database";

export default async function AdminExperiencesPage() {
  const supabase = await createClient();

  const { data: experiences, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Career // Chronological
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          CAREER EXPERIENCES.
        </h1>
        <p className="text-xs text-editorial-muted mt-1">
          Manage your professional experience list. Entries are displayed chronologically on the public portfolio.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
          Failed to load experiences: {error.message}
        </div>
      )}

      <ExperiencesManager initialExperiences={(experiences as Experience[]) || []} />
    </div>
  );
}
