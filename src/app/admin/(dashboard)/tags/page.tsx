import { createClient } from "@/lib/supabase/server";
import { TagsManager } from "@/components/admin/tags-manager";
import type { Tag } from "@/types/database";

export default async function AdminTagsPage() {
  const supabase = await createClient();

  const { data: tags, error } = await supabase
    .from("tags")
    .select(
      `
      id,
      name,
      normalized_name,
      created_at,
      project_tags (project_id)
    `
    )
    .order("name", { ascending: true });

  const formattedTags: (Tag & { projectCount: number })[] = (tags || []).map(
    (t) => ({
      id: t.id,
      name: t.name,
      normalized_name: t.normalized_name,
      created_at: t.created_at,
      projectCount: Array.isArray(t.project_tags) ? t.project_tags.length : 0,
    })
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Taxonomy // Reusable
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          TECHNOLOGY TAGS.
        </h1>
        <p className="text-xs text-editorial-muted mt-1">
          Create and manage normalized tags that can be associated with multiple portfolio projects.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
          Failed to load tags: {error.message}
        </div>
      )}

      <TagsManager initialTags={formattedTags} />
    </div>
  );
}
