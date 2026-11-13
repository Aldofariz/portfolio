# TASKS.md

## Development Task Checklist

Dokumen ini menjadi checklist implementasi portfolio website. AI coding agent harus mengerjakan task secara bertahap dan memperbarui status setiap task setelah selesai.

**Status:**

- [ ] Not Started
- [x] Completed

---

## Phase 0 — Project Initialization

- [x] Initialize Next.js project using App Router.
- [x] Configure TypeScript.
- [x] Configure Tailwind CSS.
- [x] Install and configure required dependencies.
- [x] Establish the initial project folder structure.
- [x] Configure environment variable handling.
- [x] Create the initial application layout.
- [x] Verify that the application runs locally.

**Acceptance Criteria:**

- Next.js application runs successfully in the local environment.
- TypeScript and Tailwind CSS are configured.
- Required dependencies are installed.
- Project structure follows `ARCHITECTURE.md`.

## Phase 1 — Supabase & Database Setup

- [x] Create Supabase client configuration.
- [x] Configure Supabase environment variables.
- [x] Define database schema based on `DATA_MODEL.md`.
- [x] Create database tables and relationships.
- [x] Configure Row Level Security (RLS).
- [x] Configure Supabase Storage.
- [x] Configure Supabase Auth.
- [x] Prepare initial admin access configuration.
- [x] Verify database connectivity.

**Acceptance Criteria:**

- Database schema matches `DATA_MODEL.md`.
- Relationships and constraints work correctly.
- RLS policies protect administrative data.
- Storage is accessible through the intended server-side workflow.
- Supabase Auth works correctly.

## Phase 2 — Application Foundation

- [x] Create reusable UI components.
- [x] Establish global typography and design tokens.
- [x] Configure global styles.
- [x] Implement responsive layout foundations.
- [x] Create reusable form components.
- [x] Configure Zod validation.
- [x] Configure React Hook Form.
- [x] Implement reusable server-side data access patterns.
- [x] Implement consistent error handling.

**Acceptance Criteria:**

- Components follow `DESIGN.md`.
- Layout works across desktop, tablet, and mobile.
- Forms support validation.
- Data access follows the approved architecture.

## Phase 3 — Public Website

### 3.1 Header & Hero

- [x] Implement header navigation.
- [x] Implement hero section.
- [x] Add navigation links to page sections.
- [x] Implement smooth scrolling.
- [x] Implement responsive navigation.

### 3.2 About

- [x] Implement split About layout.
- [x] Display profile image.
- [x] Display personal introduction.
- [x] Implement subtle magnetic image interaction.
- [x] Respect touch-device interaction limitations.

### 3.3 Experience

- [x] Implement editorial experience list.
- [x] Display period, position, and company.
- [x] Sort experiences from most recent to oldest.

### 3.4 Work & Project Modal

- [x] Implement asymmetric editorial project grid.
- [x] Display project previews.
- [x] Display project name and short overview.
- [x] Display technology tags.
- [x] Implement project modal.
- [x] Display project screenshots inside the modal.
- [x] Display live website link.
- [x] Implement modal close interaction.
- [x] Implement smooth modal transitions.
- [x] Ensure modal is responsive.

### 3.5 Contact & Footer

- [x] Implement bold editorial contact section.
- [x] Display primary email contact.
- [x] Display social media links.
- [x] Implement minimalist footer.
- [x] Display copyright and personal branding.

**Acceptance Criteria:**

- All public sections follow `DESIGN.md`.
- Public content is retrieved from the database.
- Projects open in a modal instead of a separate detail page.
- All public sections are responsive.
- Interactions work without compromising readability or performance.

## Phase 4 — Authentication & Admin Dashboard

### 4.1 Authentication

- [x] Implement admin login.
- [x] Implement logout.
- [x] Protect admin routes.
- [x] Implement server-side authentication checks.
- [x] Implement admin authorization using the approved allowlist approach.

### 4.2 Dashboard Foundation

- [x] Create admin dashboard layout.
- [x] Implement sidebar or dashboard navigation.
- [x] Create dashboard page.
- [x] Implement reusable admin UI components.
- [x] Implement loading, empty, and error states.

**Acceptance Criteria:**

- Only authorized administrators can access the dashboard.
- Public users cannot access protected admin routes.
- Authentication and authorization are enforced server-side.

## Phase 5 — CMS Functionality

### 5.1 About Management

- [x] Implement About data retrieval.
- [x] Implement About content editing.
- [x] Implement profile image upload.
- [x] Implement profile image replacement.
- [x] Ensure image replacement does not delete media referenced elsewhere.

### 5.2 Experience Management

- [x] Implement experience list.
- [x] Implement create experience.
- [x] Implement edit experience.
- [x] Implement delete experience.
- [x] Implement experience ordering.

### 5.3 Project Management

- [x] Implement project list.
- [x] Implement create project.
- [x] Implement edit project.
- [x] Implement delete project.
- [x] Implement project screenshot upload.
- [x] Support multiple screenshots per project.
- [x] Implement project screenshot management and ordering.

### 5.4 Technology Tags Management

- [x] Implement technology tag list.
- [x] Implement create tag.
- [x] Implement edit tag.
- [x] Implement delete tag.
- [x] Allow selecting existing tags when creating or editing projects.
- [x] Support multiple tags per project.
- [x] Prevent duplicate tags.
- [x] Ensure tags can be reused across multiple projects.

### 5.5 Media Management

- [x] Implement media metadata retrieval.
- [x] Implement image upload to Supabase Storage.
- [x] Implement media metadata creation.
- [x] Implement media selection for About and Projects.
- [x] Implement media reference handling.
- [x] Prevent deletion of media that is still referenced.

**Acceptance Criteria:**

- Admin can perform CRUD operations for About, Experience, Projects, and Technology Tags.
- Admin can upload and manage images.
- Projects support multiple images and reusable technology tags.
- Media references remain consistent.
- Saved content is immediately visible on the public website.
- No draft status, publishing workflow, or `is_published` field is implemented.

## Phase 6 — Quality Assurance

### 6.1 Functional Testing

- [x] Test public website navigation.
- [x] Test responsive layouts.
- [x] Test About content display.
- [x] Test Experience ordering.
- [x] Test project grid and modal.
- [x] Test contact and social links.
- [x] Test admin login and logout.
- [x] Test protected routes.
- [x] Test all CMS CRUD operations.
- [x] Test technology tag relationships.
- [x] Test image upload and replacement.
- [x] Test media reference integrity.

### 6.2 Security & Validation

- [x] Verify server-side authorization.
- [x] Verify RLS policies.
- [x] Verify input validation.
- [x] Verify file upload validation.
- [x] Verify sensitive environment variables are not exposed to the browser.
- [x] Verify unauthorized users cannot perform admin actions.

### 6.3 Performance & Compatibility

- [x] Check responsive behavior across screen sizes.
- [x] Check image optimization.
- [x] Check loading and error states.
- [x] Check interaction performance.
- [x] Check browser console for errors.
- [x] Fix identified bugs.

**Acceptance Criteria:**

- Core public and admin functionality works correctly.
- No critical authorization or data integrity issues remain.
- Application works responsively.
- No known critical runtime errors remain.

---

## Development Rules

1. Follow the implementation order unless a dependency requires a different sequence.
2. Complete and validate each phase before proceeding to the next.
3. Update this checklist as tasks are completed.
4. Do not implement features outside the approved scope.
5. Refer to `PRD.md`, `DESIGN.md`, `FEATURES.md`, `TECH_STACK.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, and `AGENTS.md` as the source of truth.
6. Ask for clarification before making changes that affect approved requirements or architecture.

**Out of Scope for AI Coding Agent:**

- Git repository initialization and GitHub management.
- Pushing code to GitHub.
- Vercel project configuration.
- Production deployment and release management.

These activities will be handled manually by the project owner.
