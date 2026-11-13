export interface AdminUser {
  id: string;
  user_id: string;
  created_at: string;
}

export interface Media {
  id: string;
  storage_path: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  alt_text: string | null;
  created_at: string;
}

export interface About {
  id: string;
  introduction: string;
  profile_media_id: string | null;
  updated_at: string;
  profile_media?: Media | null;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  start_date: string; // ISO date string YYYY-MM-DD
  end_date: string | null; // null if is_current is true
  is_current: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  normalized_name: string;
  created_at: string;
}

export interface ProjectMedia {
  project_id: string;
  media_id: string;
  is_cover: boolean;
  display_order: number;
  media?: Media;
}

export interface ProjectTag {
  project_id: string;
  tag_id: string;
  tag?: Tag;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  overview: string;
  live_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  media?: (Media & { is_cover: boolean; display_order: number })[];
}
