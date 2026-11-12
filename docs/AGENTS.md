# AGENTS.md

# AI Coding Agent Instructions

## 1. Project Context

You are working on a Personal Developer Portfolio for a Software Engineer.

The application consists of:

1. A public portfolio website.
2. An authenticated Basic CMS admin dashboard.

The website follows a Modern Editorial Magazine design direction.

The primary technology stack:

- Next.js App Router.
- TypeScript.
- React.
- Tailwind CSS.
- Supabase.
- PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- Vercel.

Your responsibility is to implement the approved product requirements accurately and maintainably.

## 2. Documentation Is the Source of Truth

Before implementing any feature, read the relevant project documentation:

- `PRD.md`
- `DESIGN.md`
- `FEATURES.md`
- `TECH_STACK.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `TASKS.md`

Follow these documents as the implementation baseline.

Priority:

1. Approved product requirements.
2. Approved feature specifications.
3. Approved architecture and data model.
4. Approved design guidelines.
5. Implementation details.

Do not silently change approved product decisions.

If documentation conflicts or a requirement is ambiguous:

- Stop the affected implementation.
- Explain the conflict.
- Ask for clarification when the decision materially affects behavior or architecture.
- Do not invent a new product requirement.

## 3. Development Workflow

Work incrementally.

Required workflow:

1. Inspect the existing project structure.
2. Read relevant documentation.
3. Identify the current development phase in TASKS.md.
4. Identify dependencies and affected files.
5. Propose a concise implementation plan.
6. Implement only the approved scope.
7. Run relevant validation.
8. Report completed work and remaining issues.
9. Update task status in TASKS.md.

Do not implement the entire application in one unreviewed operation.

Complete and validate one logical feature or task group before moving forward.

Do not skip phases without explicit approval.

## 4. Product Scope Rules

The approved MVP includes:

- Public single-page portfolio.
- Hero section.
- About section.
- Experience list.
- Projects editorial grid.
- Project modal.
- Contact section.
- Footer.
- Admin authentication.
- About CRUD/update functionality.
- Experience CRUD.
- Project CRUD.
- Reusable technology tag management.
- Image management.

Explicitly excluded:

- Blog or articles.
- Separate project detail pages.
- Draft and publishing workflows.
- Multi-role admin.
- Advanced analytics.
- Public user accounts.
- Comments.
- Unapproved additional pages or features.

Do not add excluded functionality unless explicitly approved.

## 5. Design Rules

Follow DESIGN.md.

Core design direction:

- Modern Editorial Magazine.
- Minimalist.
- Interactive but restrained.
- Modern Swiss / Grotesk Sans-serif typography.
- Off-white and charcoal neutral palette.
- Muted blue accent.
- Generous whitespace.
- Asymmetric editorial project grid.
- Strong typography and visual hierarchy.

Important design constraints:

- Header is not sticky or fixed.
- About uses a split layout with one personal photograph.
- Personal photo magnetic movement is limited to approximately 4–6 pixels.
- No rotation or 3D perspective for the personal photo.
- Experience uses an editorial list, not cards.
- Projects use an asymmetric editorial grid.
- Project detail opens in a modal, not a separate page.
- Contact uses oversized editorial typography.
- Footer stays minimal.

Do not replace the approved design with generic SaaS layouts or excessive card components.

## 6. Technology Rules

Follow TECH_STACK.md.

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use Supabase for database, authentication, and storage.
- Use PostgreSQL for relational data.
- Use Vercel for deployment.
- Use Zod for validation.
- Use React Hook Form where appropriate.
- Use CSS for simple animations.
- Use Motion selectively when more advanced animation behavior is needed.

Before adding a new dependency:

1. Check whether the existing stack already provides the capability.
2. Determine whether the dependency materially improves implementation.
3. Avoid adding dependencies for trivial functionality.

Use maintained and compatible package versions.

## 7. Architecture Rules

Follow ARCHITECTURE.md.

- Prefer Server Components by default.
- Use Client Components only for necessary interactivity.
- Keep privileged operations on the server.
- Use Server Actions for ordinary CMS mutations.
- Use Route Handlers when an HTTP endpoint is appropriate.
- Separate public and admin application concerns.
- Keep Supabase clients correctly separated by runtime.
- Keep data access and validation organized.
- Avoid unnecessary abstraction.

Do not create a separate backend framework or microservice architecture.

## 8. Database Rules

Follow DATA_MODEL.md.

Approved entities:

- `admin_users`
- `about`
- `experiences`
- `projects`
- `tags`
- `project_tags`
- `media`
- `project_media`

Important relationships:

- About has one active profile image reference.
- Projects can have multiple images.
- Projects and Tags have a many-to-many relationship.
- Tags are reusable.
- Media stores metadata, while actual files live in Supabase Storage.

Database requirements:

- Use UUID primary keys.
- Use foreign keys and appropriate constraints.
- Prevent duplicate normalized tag names.
- Prevent duplicate project-tag associations.
- Enforce the About singleton requirement.
- Use migrations for schema changes.
- Keep database types synchronized with the schema.

Do not introduce unapproved tables or fields without explaining why they are needed.

## 9. Publishing & Visibility Rules

This is an important approved product decision:

**All successfully saved content is immediately visible on the public website.**

Therefore:

- Do not implement draft status.
- Do not implement publish buttons.
- Do not implement approval workflows.
- Do not introduce `is_published`.
- All saved projects appear publicly.
- All successful CMS updates should trigger appropriate content revalidation.

Do not reinterpret this requirement.

## 10. Authentication & Security Rules

Security is mandatory.

- Use Supabase Auth.
- Verify sessions on the server.
- Check admin allowlist membership.
- Authentication alone does not grant admin access.
- Protect every admin route.
- Protect every CMS mutation.
- Enable and correctly configure RLS.
- Never expose service role keys to browser code.
- Never place secrets in `NEXT_PUBLIC_` variables.
- Validate all incoming data on the server.
- Validate image uploads.
- Restrict storage mutations to authorized admins.
- Use secure session handling.

Do not treat frontend visibility checks as security enforcement.

Never bypass authorization to make a feature work.

## 11. Image Management Rules

Use Supabase Storage.

Supported use cases:

- About profile photograph.
- Project preview images.
- Project screenshots.

Requirements:

- Store image binaries in storage, not ordinary database content columns.
- Store metadata and references in `media`.
- Use unique storage paths.
- Validate MIME type and file size.
- Ensure an image is not deleted while still referenced.
- Update references before cleaning up replaced images.
- Support appropriate alt text.

About must have one active profile image reference. Projects may have multiple images.

## 12. Code Quality Rules

- Use clear and descriptive naming.
- Keep components focused.
- Avoid oversized components.
- Avoid duplicated logic.
- Avoid unnecessary abstractions.
- Avoid `any` unless genuinely unavoidable and documented.
- Use consistent formatting.
- Handle loading and error states.
- Keep accessibility in mind.
- Avoid suppressing TypeScript or lint errors without justification.

Do not leave unfinished placeholder implementations while reporting a feature as complete.

## 13. Testing & Validation

After implementing a feature, run relevant checks.

At minimum, use:

- TypeScript checks.
- ESLint.
- Production build.
- Relevant functional tests where available.

Test important behavior:

- Public content rendering.
- Authentication and logout.
- Admin authorization.
- CMS CRUD operations.
- Tag relationships.
- Image upload and deletion.
- Modal behavior.
- Responsive layout.

If a check fails:

- Identify the failure.
- Fix issues caused by the implementation.
- Report unresolved issues honestly.

Do not claim a feature is fully tested if it was not tested.

## 14. Environment & Secrets

- Use `.env.example` for documenting required variables.
- Never commit `.env` files containing real secrets.
- Never print secrets in logs or reports.
- Use separate development and production credentials.
- Validate required environment variables.
- Never expose private keys to Client Components.

## 15. Git & File Management

- Preserve existing user changes.
- Inspect files before replacing them.
- Avoid destructive commands.
- Do not delete unrelated files.
- Use meaningful commit messages when committing is requested.
- Do not push or deploy without explicit authorization.
- Keep SQL migrations and documentation version-controlled.

## 16. AI Agent Communication

When reporting progress, include:

- What was implemented.
- Which files were created or modified.
- Which requirements were satisfied.
- Validation performed.
- Remaining issues or blockers.
- The next recommended task.

Ask before:

- Changing approved architecture.
- Adding major dependencies.
- Modifying database relationships.
- Introducing new product features.
- Removing existing functionality.
- Performing destructive database or storage operations.
- Deploying to production.
- Changing project scope.

## 17. Definition of Done

A task is complete only when:

- Its acceptance criteria are satisfied.
- Implementation follows the approved documentation.
- Relevant validation passes.
- No known critical regression remains.
- Documentation and task status are updated where necessary.

Never mark unfinished or unverified work as complete.
