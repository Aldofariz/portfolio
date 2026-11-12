# ARCHITECTURE.md

# Application Architecture

## 1. Overview

The application is a full-stack personal developer portfolio with an integrated Basic CMS.

Technology:

- Next.js App Router.
- TypeScript.
- Supabase PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- Vercel.

The application has two primary areas:

1. Public Website — accessible to everyone.
2. Admin Dashboard — accessible only to authorized administrators.

## 2. High-Level Architecture

```text
                 VISITORS / ADMIN
                        |
                        v
                 NEXT.JS APPLICATION
                        |
              +---------+---------+
              |                   |
              v                   v
        PUBLIC WEBSITE      ADMIN DASHBOARD
              |                   |
              |              AUTHENTICATION
              |                   |
              +---------+---------+
                        |
                        v
                   SERVER LAYER
                        |
             +----------+----------+
             |          |          |
             v          v          v
          DATABASE    STORAGE   SUPABASE AUTH
        (PostgreSQL)  (Images)   (Sessions)
```

## 3. Application Structure

Suggested Next.js App Router structure:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── about/
│   │   ├── experiences/
│   │   ├── projects/
│   │   └── tags/
│   └── api/
│       └── uploads/
│           └── route.ts
├── components/
│   ├── public/
│   ├── admin/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── supabase/
│   ├── validations/
│   ├── utils/
│   └── constants/
├── actions/
│   ├── about.ts
│   ├── experiences.ts
│   ├── projects.ts
│   └── tags.ts
└── types/
```

This is a suggested organization, not a requirement to create every file. Follow current Next.js conventions and avoid unnecessary abstractions.

## 4. Public Website Architecture

The public website is rendered through the root public page.

Responsibilities:

- Retrieve About content.
- Retrieve Experience entries.
- Retrieve Projects and their associated tags and images.
- Render the project modal.
- Display contact information.

Data flow:

1. Visitor requests the website.
2. Next.js retrieves public content from Supabase.
3. Server Components render the page.
4. Client Components handle interactive elements.
5. Visitor can browse without authentication.

All saved content is immediately eligible for public display. There is no draft or publishing workflow.

Requirements:

- Prefer Server Components for data fetching.
- Use Client Components only when necessary.
- Public queries retrieve the current saved content.
- Do not expose privileged credentials.

## 5. Admin Dashboard Architecture

The dashboard manages:

- About.
- Experiences.
- Projects.
- Reusable Tags.
- Uploaded images.

CMS mutation flow:

1. Admin submits a form.
2. Server Action receives the data.
3. Server verifies authentication and admin authorization.
4. Input is validated using Zod.
5. Server performs the database operation.
6. Application returns success or error feedback.
7. Relevant public content is revalidated after a successful mutation.

There is no draft, approval, or publish action.

A successful save directly updates the content displayed on the public website.

## 6. Authentication Architecture

Use Supabase Auth.

Login flow:

1. Admin opens `/admin/login`.
2. Admin submits credentials.
3. Supabase Auth verifies credentials.
4. A secure session is established.
5. Server verifies the session on protected routes.
6. Server checks whether the user exists in the administrator allowlist.
7. Authorized admin can access CMS functionality.

Logout flow:

1. Admin selects logout.
2. Application signs out through Supabase Auth.
3. Session is invalidated.
4. Admin is redirected to login.

Requirements:

- Use the official Supabase SSR integration for Next.js.
- Use secure cookie-based session handling.
- Verify identity and authorization on the server.
- Protect both admin pages and mutations.
- Authentication alone does not grant administrator permissions.

## 7. Database Architecture

Supabase PostgreSQL is the primary data source.

Core entities:

- `admin_users`
- `about`
- `experiences`
- `projects`
- `tags`
- `project_tags`
- `media`
- `project_media`

Relationships and constraints are defined in DATA_MODEL.md.

## 8. Image Storage Architecture

Use Supabase Storage.

Suggested bucket: `portfolio-media`.

Suggested organization:

```text
portfolio-media/
├── about/
│   └── profile-image
└── projects/
    ├── project-id-1/
    │   ├── preview-image
    │   └── screenshot-1
    └── project-id-2/
        ├── preview-image
        └── screenshot-1
```

The database stores image metadata and storage references, not binary image data.

Requirements:

- Validate uploads on the server.
- Restrict upload and deletion operations to administrators.
- Use unique storage paths.
- Prevent accidental overwrites.
- Ensure an image is not deleted while still referenced by About or a project.
- Public visitors can retrieve intended public assets.

About uses one active profile image reference. Projects can use multiple images.

## 9. Server Actions & Route Handlers

Use Server Actions for ordinary CMS mutations:

- Update About.
- Create, update, and delete Experience.
- Create, update, and delete Project.
- Create, update, and delete Tag.

Use Route Handlers where an HTTP endpoint is appropriate, such as upload processing or external integrations.

Do not create a separate REST API for every database operation without a concrete requirement.

## 10. Security Architecture

### Authentication

- Supabase Auth manages sessions.
- Server-side session verification is mandatory.

### Authorization

- Only users in the admin allowlist can manage content.
- Every protected server operation verifies authorization.
- Hidden frontend routes are not a security boundary.

### Database

- Enable Row Level Security on application tables.
- Public read access is limited to intended portfolio content.
- Write access is restricted to authorized administrators.
- Never expose service role credentials in browser code.

### Storage

- Restrict upload, update, and deletion operations.
- Public read access is allowed for intended portfolio assets.
- Validate file type and size.

### Input

- Validate incoming data.
- Validate external URLs.
- Avoid unsafe rendering of arbitrary HTML.

## 11. Data Fetching & Caching

- Use server-side data fetching for public content.
- Cache public content where appropriate.
- Revalidate affected public content after successful CMS mutations.
- Admin views should reflect the latest saved data.
- Do not publicly cache private admin responses.
- A successful save must not leave visitors seeing stale content beyond the intended cache revalidation behavior.

## 12. Error Handling

Handle:

- Authentication errors.
- Authorization failures.
- Database errors.
- Validation errors.
- Upload failures.
- Missing content.
- Network errors.

Show understandable feedback and avoid exposing internal server details to visitors.

## 13. Deployment Architecture

| Component         | Platform            |
| ----------------- | ------------------- |
| Application       | Vercel              |
| Database          | Supabase PostgreSQL |
| Authentication    | Supabase Auth       |
| Image Storage     | Supabase Storage    |
| Source Repository | GitHub              |

Maintain separate local development and production environments.

## 14. Architectural Principles

1. Keep the application simple and maintainable.
2. Prefer server-side operations for privileged functionality.
3. Use Server Components by default.
4. Use Client Components only when necessary.
5. Enforce authorization on every protected operation.
6. Keep database relationships explicit.
7. Avoid unnecessary abstractions.
8. Separate public and admin concerns.
9. Make image management reliable.
10. Every successful CMS save immediately updates public content.
