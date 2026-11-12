# TECH_STACK.md

# Technology Stack & Technical Decisions

## 1. Overview

This document defines the proposed technology stack for the Personal Developer Portfolio.

The application consists of:

- Public portfolio website.
- Authenticated admin dashboard.
- Backend functionality for content management.
- Relational database.
- Image upload and storage.

The technology choices should prioritize:

- Developer experience.
- Maintainability.
- Performance.
- Security.
- Compatibility with AI-assisted development.
- Minimal operational complexity.
- Room for future improvements without unnecessary abstraction.

## 2. Recommended Stack

| Layer            | Technology                                   | Purpose                                       |
| ---------------- | -------------------------------------------- | --------------------------------------------- |
| Framework        | Next.js (App Router)                         | Full-stack React framework                    |
| Language         | TypeScript                                   | Type safety                                   |
| UI Library       | React                                        | Component-based UI                            |
| Styling          | Tailwind CSS                                 | Utility-first styling                         |
| UI Components    | Custom components                            | Consistent editorial design                   |
| Animation        | Motion (formerly Framer Motion), selectively | UI transitions and micro-interactions         |
| Backend          | Next.js Server Actions and Route Handlers    | Server-side operations and API endpoints      |
| Database         | PostgreSQL                                   | Persistent relational data                    |
| Backend Platform | Supabase                                     | Managed database, authentication, and storage |
| Authentication   | Supabase Auth                                | Admin authentication                          |
| Image Storage    | Supabase Storage                             | Personal and project images                   |
| Validation       | Zod                                          | Input and environment validation              |
| Form Handling    | React Hook Form                              | Admin forms                                   |
| Deployment       | Vercel                                       | Application hosting                           |
| Version Control  | Git + GitHub                                 | Source control                                |

## 3. Frontend

### 3.1 Next.js

Use Next.js with the App Router.

Responsibilities:

- Public portfolio rendering.
- Admin dashboard rendering.
- Server-side data access.
- Server Actions for mutations.
- Route Handlers for operations requiring HTTP endpoints.
- Authentication-aware route handling.

Requirements:

- Prefer Server Components for pages and components that do not require client-side interaction.
- Use Client Components only when necessary, such as interactive modals, forms, and animations.
- Keep public content rendering efficient.
- Avoid unnecessary client-side JavaScript.

### 3.2 TypeScript

Use TypeScript throughout the application.

Requirements:

- Enable strict type checking.
- Define reusable types for domain entities.
- Avoid unnecessary use of `any`.
- Keep frontend and backend data contracts consistent.

### 3.3 Tailwind CSS

Use Tailwind CSS for styling.

Requirements:

- Establish reusable design tokens.
- Maintain consistent spacing, typography, and colors.
- Avoid scattered arbitrary values where reusable tokens are appropriate.
- Keep responsive styling consistent with DESIGN.md.

### 3.4 Component Architecture

Use reusable components where they provide meaningful value.

Suggested component groups:

- Layout components.
- Navigation components.
- Section components.
- Project components.
- Modal components.
- Admin form components.
- Shared UI components.

Avoid creating abstractions for components that are only used once and have no meaningful shared behavior.

## 4. Animation

Use CSS transitions and animations for simple interactions.

Use Motion only when an interaction requires more advanced animation behavior.

Potential use cases:

- Project modal transitions.
- Scroll-based reveal animations.
- Image transitions.
- Selected micro-interactions.

Requirements:

- Avoid excessive animation.
- Respect reduced-motion preferences.
- Do not animate every element.
- Preserve performance and accessibility.

## 5. Backend

### 5.1 Next.js Server-Side Functionality

Use Next.js Server Actions and Route Handlers.

Responsibilities:

- Create, read, update, and delete portfolio content.
- Validate incoming data.
- Verify admin authorization.
- Manage image upload operations.
- Handle database interactions.

Requirements:

- Never rely exclusively on frontend validation.
- Verify authentication and authorization on the server.
- Keep sensitive operations out of client-side code.
- Return predictable success and error responses.

### 5.2 Supabase

Use Supabase as the managed backend platform.

Services:

- PostgreSQL database.
- Authentication.
- Object storage.

This reduces the need to operate separate infrastructure for the MVP.

## 6. Database

### PostgreSQL

Use PostgreSQL through Supabase.

Reasons:

- Relational data fits the portfolio CMS.
- Supports many-to-many relationships.
- Provides constraints and indexes.
- Suitable for reusable technology tags.
- Supports future expansion.

Expected entities:

- Admin users or authentication identities.
- About.
- Experiences.
- Projects.
- Tags.
- Project Tags.
- Media / Images.

The exact schema and relationships will be defined in DATA_MODEL.md.

### Database Access

Use the official Supabase client for database operations.

Requirements:

- Keep database access on the server for privileged operations.
- Use typed database definitions where practical.
- Avoid unnecessary ORM complexity for the MVP.
- Use database constraints to protect data integrity.

## 7. Authentication & Authorization

Use Supabase Auth.

Requirements:

- Admin login and logout.
- Protected admin routes.
- Server-side authorization checks for every protected mutation.
- Public visitors do not need an account.
- Only authorized administrators can manage portfolio content.

Security considerations:

- Never expose the Supabase service role key to the browser.
- Use the appropriate server-side Supabase client.
- Configure Row Level Security (RLS) policies.
- Do not treat hidden frontend routes as a security boundary.
- Validate the authenticated user and permissions before privileged operations.

The exact session and middleware/proxy implementation will be specified in ARCHITECTURE.md.

## 8. Image Storage

Use Supabase Storage.

Use cases:

- Personal photograph.
- Project preview images.
- Project screenshots.

Requirements:

- Store image files in object storage.
- Store image metadata and storage references in the database where needed.
- Validate file types and file sizes.
- Use predictable storage paths.
- Prevent unauthorized uploads and deletions.
- Avoid storing binary image data directly in ordinary database records.

Image optimization and delivery strategy will be defined during implementation.

## 9. Form Handling & Validation

### React Hook Form

Use for admin forms that benefit from structured form state and validation.

### Zod

Use for:

- Required field validation.
- URL validation.
- Image metadata validation where applicable.
- Server-side input validation.
- Environment variable validation.

Requirements:

- Reuse validation schemas where appropriate.
- Server-side validation remains mandatory.
- Display understandable validation errors.
- Preserve form input when an operation fails where practical.

## 10. Deployment & Infrastructure

### Vercel

Use Vercel to deploy the Next.js application.

Responsibilities:

- Application hosting.
- Production builds.
- Environment variable configuration.
- Deployment previews.
- Production deployment.

### Supabase

Use Supabase for:

- Hosted PostgreSQL.
- Authentication.
- Image storage.

Environments:

- Local development.
- Production.

Development and production credentials must remain separate.

## 11. Development Tools

Recommended tools:

- Git for version control.
- GitHub for repository hosting.
- ESLint for code quality.
- Prettier for formatting.
- TypeScript for static type checking.

Requirements:

- Keep the repository organized.
- Use meaningful commit messages.
- Do not commit secrets or environment files.
- Provide an `.env.example` containing variable names without real credentials.

## 12. Environment Variables

Environment configuration should be documented.

Expected variables include:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or the appropriate publishable key for the Supabase project.
- `SUPABASE_SERVICE_ROLE_KEY` or the appropriate secret key, server-side only.

Requirements:

- Never commit actual credentials.
- Never expose secret keys through `NEXT_PUBLIC_` variables.
- Validate required environment variables during application startup or server initialization.
- Document setup instructions in README.md.

## 13. Technical Constraints

- Prefer the official SDKs and supported integrations.
- Avoid unnecessary third-party dependencies.
- Avoid introducing a separate backend service unless a concrete requirement justifies it.
- Avoid overengineering the CMS.
- Keep database operations and authorization on the server.
- Keep the frontend responsive and performant.
- Use stable, maintained package versions at implementation time.

## 14. Out of Scope for the MVP

Unless explicitly approved, do not introduce:

- Microservices.
- Kubernetes.
- Separate backend frameworks.
- Redis or caching infrastructure without a demonstrated need.
- Complex state management libraries without a demonstrated need.
- Multiple database systems.
- Complex CI/CD infrastructure.
- Multi-tenant architecture.

## 15. Decision Summary

The proposed MVP stack:

**Next.js + TypeScript + Tailwind CSS + Supabase + PostgreSQL + Vercel**

This combination provides:

- One primary application framework for frontend and backend.
- A relational database for CMS content.
- Managed authentication.
- Managed image storage.
- A straightforward deployment workflow.

The final stack must be approved before it becomes the implementation baseline.
