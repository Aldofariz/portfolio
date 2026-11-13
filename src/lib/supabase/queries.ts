import { createClient } from "@/lib/supabase/server";
import type { About, Experience, Project, Tag, Media } from "@/types/database";

/**
 * Public Query: Fetch the About section (singleton) with its profile media
 */
export async function getPublicAbout(): Promise<About | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("about")
      .select(
        `
        id,
        introduction,
        profile_media_id,
        updated_at,
        profile_media:media!about_profile_media_id_fkey (
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

    if (error) {
      console.error("Error fetching public about:", error.message);
      return null;
    }

    if (!data) return null;

    // Normalize profile_media relation
    const aboutData: About = {
      id: data.id,
      introduction: data.introduction,
      profile_media_id: data.profile_media_id,
      updated_at: data.updated_at,
      profile_media: Array.isArray(data.profile_media)
        ? data.profile_media[0] ?? null
        : (data.profile_media as unknown as Media) ?? null,
    };

    return aboutData;
  } catch (err) {
    console.error("Unexpected error fetching public about:", err);
    return null;
  }
}

/**
 * Public Query: Fetch experiences ordered by display_order then start_date desc
 */
export async function getPublicExperiences(): Promise<Experience[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching public experiences:", error.message);
      return [];
    }

    return (data as Experience[]) || [];
  } catch (err) {
    console.error("Unexpected error fetching public experiences:", err);
    return [];
  }
}

/**
 * Public Query: Fetch projects with tags and media
 */
export async function getPublicProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
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

    if (error) {
      console.error("Error fetching public projects:", error.message);
      return [];
    }

    if (!data) return [];

    // Map nested junction records into clean Project entity types
    const projects: Project[] = data.map((item) => {
      // Tags
      const tags: Tag[] = [];
      if (Array.isArray(item.project_tags)) {
        item.project_tags.forEach((pt: { tag: unknown }) => {
          if (pt.tag && typeof pt.tag === "object" && "id" in pt.tag) {
            tags.push(pt.tag as Tag);
          }
        });
      }

      // Media
      type RawMediaItem = {
        is_cover: boolean;
        display_order: number;
        media: Media | null;
      };

      const mediaItems: (Media & { is_cover: boolean; display_order: number })[] = [];
      if (Array.isArray(item.project_media)) {
        (item.project_media as unknown as RawMediaItem[]).forEach((pm) => {
          if (pm.media && typeof pm.media === "object") {
            mediaItems.push({
              ...pm.media,
              is_cover: pm.is_cover,
              display_order: pm.display_order,
            });
          }
        });
      }

      // Sort media: covers first, then display_order
      mediaItems.sort((a, b) => {
        if (a.is_cover && !b.is_cover) return -1;
        if (!a.is_cover && b.is_cover) return 1;
        return a.display_order - b.display_order;
      });

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
        media: mediaItems,
      };
    });

    return projects;
  } catch (err) {
    console.error("Unexpected error fetching public projects:", err);
    return [];
  }
}

/**
 * Public Query: Fetch single project by slug
 */
export async function getPublicProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPublicProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export { getMediaPublicUrl } from "@/lib/utils/media";
