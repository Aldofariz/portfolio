import { createClient } from "@/lib/supabase/server";
import { ProjectEditor } from "@/components/admin/project-editor";
import type { Tag, Media } from "@/types/database";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const [{ data: tags }, { data: media }] = await Promise.all([
    supabase.from("tags").select("*").order("name", { ascending: true }),
    supabase.from("media").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-editorial-border pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Exhibits // New
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          NEW PORTFOLIO PROJECT.
        </h1>
      </div>

      <ProjectEditor
        project={null}
        availableTags={(tags as Tag[]) || []}
        availableMedia={(media as Media[]) || []}
      />
    </div>
  );
}
