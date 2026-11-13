import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectEditor } from "@/components/admin/project-editor";
import type { Project, Tag, Media } from "@/types/database";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: rawProject, error: projectError },
    { data: tags },
    { data: media },
  ] = await Promise.all([
    supabase
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
      .eq("id", id)
      .maybeSingle(),
    supabase.from("tags").select("*").order("name", { ascending: true }),
    supabase.from("media").select("*").order("created_at", { ascending: false }),
  ]);

  if (projectError || !rawProject) {
    notFound();
  }

  type RawMediaItem = {
    is_cover: boolean;
    display_order: number;
    media: Media | null;
  };

  const projectTags: Tag[] = [];
  if (Array.isArray(rawProject.project_tags)) {
    rawProject.project_tags.forEach((pt: { tag: unknown }) => {
      if (pt.tag && typeof pt.tag === "object" && "id" in pt.tag) {
        projectTags.push(pt.tag as Tag);
      }
    });
  }

  const projectMedia: (Media & { is_cover: boolean; display_order: number })[] = [];
  if (Array.isArray(rawProject.project_media)) {
    (rawProject.project_media as unknown as RawMediaItem[]).forEach((pm) => {
      if (pm.media && typeof pm.media === "object") {
        projectMedia.push({
          ...pm.media,
          is_cover: pm.is_cover,
          display_order: pm.display_order,
        });
      }
    });
  }

  const project: Project = {
    id: rawProject.id,
    name: rawProject.name,
    slug: rawProject.slug,
    overview: rawProject.overview,
    live_url: rawProject.live_url,
    display_order: rawProject.display_order,
    created_at: rawProject.created_at,
    updated_at: rawProject.updated_at,
    tags: projectTags,
    media: projectMedia,
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-editorial-border pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Exhibits // Edit
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          EDIT PROJECT.
        </h1>
      </div>

      <ProjectEditor
        project={project}
        availableTags={(tags as Tag[]) || []}
        availableMedia={(media as Media[]) || []}
      />
    </div>
  );
}
