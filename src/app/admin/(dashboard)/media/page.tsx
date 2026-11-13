import { createClient } from "@/lib/supabase/server";
import { MediaManager } from "@/components/admin/media-manager";
import type { Media } from "@/types/database";

export default async function AdminMediaPage() {
  const supabase = await createClient();

  const { data: mediaItems, error } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-editorial-border pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
          Assets // Supabase Storage
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-editorial-fg mt-1">
          MEDIA LIBRARY.
        </h1>
        <p className="text-xs text-editorial-muted mt-1">
          Upload and manage images stored in bucket &quot;portfolio-media&quot;. Files can be referenced as profile photos or project screenshots.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-700 font-mono">
          Failed to load media assets: {error.message}
        </div>
      )}

      <MediaManager initialMedia={(mediaItems as Media[]) || []} />
    </div>
  );
}
