import { createClient } from "@/lib/supabase/server";
import { AboutManager } from "@/components/admin/about-manager";
import type { About, Media } from "@/types/database";

export default async function AdminAboutPage() {
  const supabase = await createClient();

  // Fetch about with profile_media
  const { data: aboutData } = await supabase
    .from("about")
    .select(
      `
      id,
      introduction,
      profile_media_id,
      updated_at,
      profile_media:profile_media_id (
        id,
        storage_path,
        original_filename,
        mime_type,
        file_size,
        alt_text,
        created_at
      )
    `
    )
    .maybeSingle();

  // Fetch all media items for selection
  const { data: mediaItems } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  const about: About | null = aboutData
    ? {
        id: aboutData.id,
        introduction: aboutData.introduction,
        profile_media_id: aboutData.profile_media_id,
        updated_at: aboutData.updated_at,
        profile_media: Array.isArray(aboutData.profile_media)
          ? aboutData.profile_media[0] ?? null
          : (aboutData.profile_media as unknown as Media) ?? null,
      }
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Identity // Biography
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          ABOUT & PROFILE.
        </h1>
        <p className="text-xs text-editorial-muted mt-1">
          Configure your personal introduction and active profile photograph. Changes are published immediately.
        </p>
      </div>

      <AboutManager initialAbout={about} availableMedia={(mediaItems as Media[]) || []} />
    </div>
  );
}
