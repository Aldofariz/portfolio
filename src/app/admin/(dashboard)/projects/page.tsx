import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ProjectsListManager } from "@/components/admin/projects-list-manager";
import { Plus } from "lucide-react";
import type { Project, Tag, Media } from "@/types/database";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: rawProjects, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      slug,
      overview,
      live_url,
      display_order,
      created_at,
      updated_at,
      project_tags (
        tag:tag_id (
          id,
          name,
          normalized_name,
          created_at
        )
      ),
      project_media (
        is_cover,
        display_order,
        media:media_id (
          id,
          storage_path,
          original_filename,
          mime_type,
          file_size,
          alt_text,
          created_at
        )
      )
    `
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  type RawMediaItem = {
    is_cover: boolean;
    display_order: number;
    media: Media | null;
  };

  const projects: Project[] = (rawProjects || []).map((item) => {
    const tags: Tag[] = [];
    if (Array.isArray(item.project_tags)) {
      item.project_tags.forEach((pt: { tag: unknown }) => {
        if (pt.tag && typeof pt.tag === "object" && "id" in pt.tag) {
          tags.push(pt.tag as Tag);
        }
      });
    }

    const media: (Media & { is_cover: boolean; display_order: number })[] = [];
    if (Array.isArray(item.project_media)) {
      (item.project_media as unknown as RawMediaItem[]).forEach((pm) => {
        if (pm.media && typeof pm.media === "object") {
          media.push({
            ...pm.media,
            is_cover: pm.is_cover,
            display_order: pm.display_order,
          });
        }
      });
    }

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      overview: item.overview,
      live_url: item.live_url,
      display_order: item.display_order,
      created_at: item.created_at,
      updated_at: item.updated_at,
      tags,
      media,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
            Portfolio // Exhibits
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
            PROJECTS.
          </h1>
          <p className="text-xs text-editorial-muted mt-1">
            Manage projects displayed in the asymmetric portfolio grid. All changes publish immediately.
          </p>
        </div>

        <Link href="/admin/projects/new">
          <Button variant="primary" size="sm" className="space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
          Failed to load projects: {error.message}
        </div>
      )}

      <ProjectsListManager initialProjects={projects} />
    </div>
  );
}
