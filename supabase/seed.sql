-- ==============================================================================
-- seed.sql
-- Development / Initial Seed Data for Personal Developer Portfolio
-- Note: Does NOT insert into admin_users, as admin accounts must be created 
-- through the controlled admin bootstrap procedure.
-- ==============================================================================

-- 1. About Singleton
INSERT INTO public.about (introduction)
VALUES (
  'Software Engineer with a focus on modern web architectures, performant distributed systems, and refined interactive editorial experiences. Holding an Informatics Engineering background, blending robust engineering with thoughtful design awareness.'
)
ON CONFLICT (is_singleton) DO NOTHING;

-- 2. Technology Tags
INSERT INTO public.tags (id, name, normalized_name)
VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c01', 'TypeScript', 'typescript'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c02', 'Next.js', 'nextjs'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c03', 'React', 'react'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c04', 'PostgreSQL', 'postgresql'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c05', 'Tailwind CSS', 'tailwindcss'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c06', 'Go', 'go'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c07', 'Supabase', 'supabase')
ON CONFLICT (normalized_name) DO NOTHING;

-- 3. Professional Experience (Chronological by default: most recent first)
INSERT INTO public.experiences (id, position, company, start_date, end_date, is_current, display_order)
VALUES
  ('c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c21', 'Frontend Developer', 'Studio Minimal', '2025-01-01', NULL, true, 1),
  ('c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c22', 'Fullstack Developer', 'Digital Labs Inc', '2024-03-01', '2024-12-31', false, 2),
  ('c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c23', 'UI/UX Designer', 'Creative Tech Foundry', '2023-06-01', '2024-02-28', false, 3)
ON CONFLICT (id) DO NOTHING;

-- 4. Projects
INSERT INTO public.projects (id, name, slug, overview, live_url, display_order)
VALUES
  (
    'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c11',
    'Editorial Portfolio & CMS',
    'editorial-portfolio-cms',
    'A minimalist, magazine-inspired personal portfolio integrated with an authenticated Next.js Server Actions CMS and Supabase PostgreSQL.',
    'https://portfolio.example.com',
    1
  ),
  (
    'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c12',
    'Real-time Telemetry Engine',
    'real-time-telemetry-engine',
    'Distributed event streaming engine capable of processing telemetry at sub-millisecond latencies with an interactive visual dashboard.',
    'https://analytics.example.com',
    2
  ),
  (
    'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c13',
    'Design Systems Toolkit',
    'design-systems-toolkit',
    'Comprehensive component library and design token management system focusing on Swiss/Grotesk typography and accessible micro-interactions.',
    'https://design-system.example.com',
    3
  )
ON CONFLICT (slug) DO NOTHING;

-- 5. Project Tags Junction
INSERT INTO public.project_tags (project_id, tag_id)
VALUES
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c11', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c01'), -- TS
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c11', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c02'), -- Next.js
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c11', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c04'), -- Postgres
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c12', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c06'), -- Go
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c12', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c01'), -- TS
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c13', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c03'), -- React
  ('b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c13', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c05')  -- Tailwind
ON CONFLICT DO NOTHING;
