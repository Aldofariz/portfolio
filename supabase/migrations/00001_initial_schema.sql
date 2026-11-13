-- ==============================================================================
-- 00001_initial_schema.sql
-- Personal Developer Portfolio Database Schema
-- Revised based on security, explicit grants, and integrity review
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Tables & Structural Constraints
-- ------------------------------------------------------------------------------

-- 1.1 admin_users
-- Stores allowlisted Supabase Auth users who are permitted to access CMS features.
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.2 media
-- Stores metadata for assets stored in Supabase Storage.
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.3 about (Singleton Table)
-- Guaranteed to only allow exactly one row via unique check on is_singleton.
CREATE TABLE IF NOT EXISTS public.about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  introduction TEXT NOT NULL,
  profile_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
  is_singleton BOOLEAN NOT NULL DEFAULT true UNIQUE CHECK (is_singleton = true),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.4 experiences
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT check_date_range CHECK (end_date IS NULL OR end_date >= start_date)
);

-- 1.5 projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  overview TEXT NOT NULL,
  live_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.6 tags
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.7 project_tags (Many-to-many junction)
CREATE TABLE IF NOT EXISTS public.project_tags (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

-- 1.8 project_media (Many-to-many junction with cover flag and order)
CREATE TABLE IF NOT EXISTS public.project_media (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media(id) ON DELETE RESTRICT,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (project_id, media_id)
);

-- ------------------------------------------------------------------------------
-- 2. Indexes & Integrity Constraints
-- ------------------------------------------------------------------------------

-- Fast sorting on display_order
CREATE INDEX IF NOT EXISTS idx_experiences_display_order 
  ON public.experiences (display_order);

CREATE INDEX IF NOT EXISTS idx_projects_display_order 
  ON public.projects (display_order);

-- Junction table reverse lookups
CREATE INDEX IF NOT EXISTS idx_project_tags_tag_id 
  ON public.project_tags (tag_id);

CREATE INDEX IF NOT EXISTS idx_project_media_media_id 
  ON public.project_media (media_id);

-- Enforce at most ONE cover image per project
CREATE UNIQUE INDEX IF NOT EXISTS idx_project_media_single_cover
  ON public.project_media (project_id)
  WHERE (is_cover = true);

-- Note: projects(slug) and tags(normalized_name) are already indexed by UNIQUE constraints.

-- ------------------------------------------------------------------------------
-- 3. Security Function: is_admin()
-- ------------------------------------------------------------------------------

-- Hardened helper function:
-- - STABLE: evaluated once per statement for optimal query performance.
-- - SECURITY DEFINER: executes with elevated owner rights to check admin_users.
-- - SET search_path = '': prevents search_path injection vulnerabilities.
-- - Fully qualified schema names on all table and function references.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users
    WHERE user_id = (SELECT auth.uid())
  );
$$;

-- Restrict function execution: Only authenticated users may invoke is_admin()
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. Explicit Database Grants (for environments without auto-expose)
-- ------------------------------------------------------------------------------

-- Grant schema access
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Public read grants on portfolio content
GRANT SELECT ON TABLE 
  public.about,
  public.experiences,
  public.projects,
  public.tags,
  public.project_tags,
  public.media,
  public.project_media
TO anon, authenticated;

-- Allow authenticated users to inspect their own admin allowlist record
GRANT SELECT ON TABLE public.admin_users TO authenticated;

-- Allow authenticated users to perform writes on CMS content (restricted by RLS)
GRANT INSERT, UPDATE, DELETE ON TABLE
  public.about,
  public.experiences,
  public.projects,
  public.tags,
  public.project_tags,
  public.media,
  public.project_media
TO authenticated;

-- Explicitly DO NOT grant INSERT/UPDATE/DELETE on admin_users to authenticated.
-- Admin assignment must be performed via controlled bootstrap/SQL editor/service role.

-- ------------------------------------------------------------------------------
-- 5. Row Level Security (RLS) Configuration
-- ------------------------------------------------------------------------------

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

-- Idempotent RLS Policy Setup
DO $$
BEGIN

  -- 5.1 admin_users: Allow authenticated users to view only their own record
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'Allow user to read own admin record'
  ) THEN
    CREATE POLICY "Allow user to read own admin record"
      ON public.admin_users FOR SELECT
      TO authenticated
      USING (user_id = (SELECT auth.uid()));
  END IF;

  -- 5.2 about: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'about' AND policyname = 'Public read about'
  ) THEN
    CREATE POLICY "Public read about"
      ON public.about FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'about' AND policyname = 'Admin write about'
  ) THEN
    CREATE POLICY "Admin write about"
      ON public.about FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.3 experiences: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'experiences' AND policyname = 'Public read experiences'
  ) THEN
    CREATE POLICY "Public read experiences"
      ON public.experiences FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'experiences' AND policyname = 'Admin write experiences'
  ) THEN
    CREATE POLICY "Admin write experiences"
      ON public.experiences FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.4 projects: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'projects' AND policyname = 'Public read projects'
  ) THEN
    CREATE POLICY "Public read projects"
      ON public.projects FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'projects' AND policyname = 'Admin write projects'
  ) THEN
    CREATE POLICY "Admin write projects"
      ON public.projects FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.5 tags: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'tags' AND policyname = 'Public read tags'
  ) THEN
    CREATE POLICY "Public read tags"
      ON public.tags FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'tags' AND policyname = 'Admin write tags'
  ) THEN
    CREATE POLICY "Admin write tags"
      ON public.tags FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.6 project_tags: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'project_tags' AND policyname = 'Public read project_tags'
  ) THEN
    CREATE POLICY "Public read project_tags"
      ON public.project_tags FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'project_tags' AND policyname = 'Admin write project_tags'
  ) THEN
    CREATE POLICY "Admin write project_tags"
      ON public.project_tags FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.7 media: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'media' AND policyname = 'Public read media'
  ) THEN
    CREATE POLICY "Public read media"
      ON public.media FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'media' AND policyname = 'Admin write media'
  ) THEN
    CREATE POLICY "Admin write media"
      ON public.media FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

  -- 5.8 project_media: Public read, Admin write
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'project_media' AND policyname = 'Public read project_media'
  ) THEN
    CREATE POLICY "Public read project_media"
      ON public.project_media FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'project_media' AND policyname = 'Admin write project_media'
  ) THEN
    CREATE POLICY "Admin write project_media"
      ON public.project_media FOR ALL
      TO authenticated
      USING (public.is_admin())
      WITH CHECK (public.is_admin());
  END IF;

END $$;

-- ------------------------------------------------------------------------------
-- 6. Supabase Storage Setup (portfolio-media)
-- ------------------------------------------------------------------------------

-- Ensure the portfolio-media bucket exists and is marked public
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage object policies
DO $$
BEGIN

  -- Public read for images in portfolio-media
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read portfolio-media objects'
  ) THEN
    CREATE POLICY "Public read portfolio-media objects"
      ON storage.objects FOR SELECT
      TO anon, authenticated
      USING (bucket_id = 'portfolio-media');
  END IF;

  -- Admin insert objects
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admin insert portfolio-media objects'
  ) THEN
    CREATE POLICY "Admin insert portfolio-media objects"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'portfolio-media' 
        AND public.is_admin()
      );
  END IF;

  -- Admin update objects
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admin update portfolio-media objects'
  ) THEN
    CREATE POLICY "Admin update portfolio-media objects"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (
        bucket_id = 'portfolio-media' 
        AND public.is_admin()
      )
      WITH CHECK (
        bucket_id = 'portfolio-media' 
        AND public.is_admin()
      );
  END IF;

  -- Admin delete objects
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admin delete portfolio-media objects'
  ) THEN
    CREATE POLICY "Admin delete portfolio-media objects"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (
        bucket_id = 'portfolio-media' 
        AND public.is_admin()
      );
  END IF;

END $$;
