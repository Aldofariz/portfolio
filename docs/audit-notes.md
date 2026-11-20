# Landing Page Redesign — Task 0 Audit

Audit date: 2026-11-20

## Repository facts

- Framework: Next.js 16.4.6 with the App Router; React and React DOM are 19.3.0. The public page is `src/app/page.tsx`.
- Styling: Tailwind CSS 4.3.3, imported from `src/app/globals.css`. The current background token is `--color-editorial-bg: #fafaf9`; foreground is `--color-editorial-fg: #141413`.
- Current font setup: no `next/font` import or font loading in the app layout. CSS defines `--font-sans` with a Geist variable followed by system fallbacks. `src/app/layout.tsx` is the root layout shared by `/` and all `/admin` routes.
- Public landing components: `header.tsx`, `hero.tsx`, `about-section.tsx`, `about-photo.tsx`, `experience-list.tsx`, `projects-grid.tsx`, `project-modal.tsx`, `contact-section.tsx`, and `footer.tsx`, under `src/components/public/`.
- Existing section anchors are `#about`, `#work`, and `#contact`. The home page composes the same header, hero, About, work, contact, and footer sequence described in the redesign overview.
- About data: `getPublicAbout()` in `src/lib/supabase/queries.ts` reads `introduction` and the related `profile_media` record, including `storage_path` and `alt_text`. The public page turns the path into a public Supabase Storage URL with `getMediaPublicUrl()` in `src/lib/utils/media.ts`; `next.config.ts` already allows `*.supabase.co` images.
- When About or its introduction is missing/empty, `about-section.tsx` currently renders a hardcoded fallback paragraph. The redesign contract instead says empty bio renders no paragraph while retaining its heading.
- Experience entity fields are `position`, `company`, `start_date`, `end_date`, `is_current`, and `display_order` in `src/types/database.ts`. Query ordering is `display_order` ascending, then `start_date` descending. No explicit id tie-breaker exists. `experience-list.tsx` formats year-only ranges and renders `PRESENT` in uppercase for current/open-ended entries. With no experiences it currently displays a placeholder; the redesign contract says to hide the whole Experience block.
- Revalidation: `src/app/page.tsx` sets `revalidate = 0`; CMS Server Actions call `revalidatePath("/")` after successful content changes. No redesign changes to these paths are needed.
- Motion is already installed at 14.13.0; its declared React and React DOM peer ranges include React 19. Next.js declares compatibility with React 19. The existing About photo already uses Motion and a 5px cursor displacement.
- The redesign icon files are not present in `public/`. The official Microsoft Fluent Emoji repository has 3D style entries for Identification card, Laptop, Gear, Brick, Artist palette, Rocket, and Hot beverage. The repository marks itself MIT licensed. Confirm final appearance and total optimized asset size when obtaining the actual files.
- Next.js font documentation supports additional variable font axes through the `axes` option. Archivo is published as a variable font with width (`wdth`) and weight axes; the exact generated `next/font/google` request for the installed Next.js version has not been run. The design-system fallback to Archivo Narrow remains available if that request fails.
- Current branch is `main`. The supplied `portfolio-redesign-docs/` directory is untracked in Git; it was preserved.

## Differences and items to preserve/resolve

1. Current About empty state substitutes a fallback bio; redesign data contract requires an empty body.
2. Current empty Experience state shows a placeholder; redesign requires no Experience block at all.
3. Current open-ended experience label is uppercase `PRESENT`; redesign calls for title-case `Present`.
4. Current query already implements the requested primary and secondary ordering, but not the documented id tie-breaker. The data contract says to preserve existing query ordering; any stable tie handling should remain presentation-only if needed.
5. The About section currently contains an `h1` for the owner's name in addition to the Hero `h1`; redesign specifies one page `h1` and a visually hidden About `h2`.
6. Occupation and education are already shown as hardcoded content in the About section. The live database bio was not available in the repository, so the assumption that education is not duplicated in the bio remains unverified.
7. The `next/font/google` Archivo width-axis build-time request and visual review of the downloaded Fluent Emoji files remain to be confirmed during implementation.

## Task 1 implementation constraints

- Load Instrument Serif and Archivo as specified, and scope their variables/classes to the homepage wrapper in `src/app/page.tsx`; do not apply them to the shared root `<html>` or `<body>`.
- Keep existing background and foreground tokens unchanged. Keep all edits within landing-page typography, global tokens needed for the design system, and the navbar font styling.
- Do not edit admin routes/components, Server Actions, queries, validation, Supabase clients, schema, or storage logic.
- Visual identity check for admin should compare the unchanged root styles and confirm the new font scope is absent from `/admin`.
