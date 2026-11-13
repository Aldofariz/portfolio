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
- [ ] Verify database connectivity.

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

- [ ] Implement About data retrieval.
- [ ] Implement About content editing.
- [ ] Implement profile image upload.
- [ ] Implement profile image replacement.
- [ ] Ensure image replacement does not delete media referenced elsewhere.

### 5.2 Experience Management

- [ ] Implement experience list.
- [ ] Implement create experience.
- [ ] Implement edit experience.
- [ ] Implement delete experience.
- [ ] Implement experience ordering.

### 5.3 Project Management

- [ ] Implement project list.
- [ ] Implement create project.
- [ ] Implement edit project.
- [ ] Implement delete project.
- [ ] Implement project screenshot upload.
- [ ] Support multiple screenshots per project.
- [ ] Implement project screenshot management and ordering.

### 5.4 Technology Tags Management

- [ ] Implement technology tag list.
- [ ] Implement create tag.
- [ ] Implement edit tag.
- [ ] Implement delete tag.
- [ ] Allow selecting existing tags when creating or editing projects.
- [ ] Support multiple tags per project.
- [ ] Prevent duplicate tags.
- [ ] Ensure tags can be reused across multiple projects.

### 5.5 Media Management

- [ ] Implement media metadata retrieval.
- [ ] Implement image upload to Supabase Storage.
- [ ] Implement media metadata creation.
- [ ] Implement media selection for About and Projects.
- [ ] Implement media reference handling.
- [ ] Prevent deletion of media that is still referenced.

**Acceptance Criteria:**

- Admin can perform CRUD operations for About, Experience, Projects, and Technology Tags.
- Admin can upload and manage images.
- Projects support multiple images and reusable technology tags.
- Media references remain consistent.
- Saved content is immediately visible on the public website.
- No draft status, publishing workflow, or `is_published` field is implemented.

## Phase 6 — Quality Assurance

### 6.1 Functional Testing

- [ ] Test public website navigation.
- [ ] Test responsive layouts.
- [ ] Test About content display.
- [ ] Test Experience ordering.
- [ ] Test project grid and modal.
- [ ] Test contact and social links.
- [ ] Test admin login and logout.
- [ ] Test protected routes.
- [ ] Test all CMS CRUD operations.
- [ ] Test technology tag relationships.
- [ ] Test image upload and replacement.
- [ ] Test media reference integrity.

### 6.2 Security & Validation

- [ ] Verify server-side authorization.
- [ ] Verify RLS policies.
- [ ] Verify input validation.
- [ ] Verify file upload validation.
- [ ] Verify sensitive environment variables are not exposed to the browser.
- [ ] Verify unauthorized users cannot perform admin actions.

### 6.3 Performance & Compatibility

- [ ] Check responsive behavior across screen sizes.
- [ ] Check image optimization.
- [ ] Check loading and error states.
- [ ] Check interaction performance.
- [ ] Check browser console for errors.
- [ ] Fix identified bugs.

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
