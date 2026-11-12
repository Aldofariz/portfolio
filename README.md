# README.md

# Personal Developer Portfolio

A personal portfolio website for showcasing professional background, experience, and selected projects as a Software Engineer.

The website combines a modern editorial design direction with a lightweight CMS dashboard for managing portfolio content.

## Overview

This project is a single-page personal portfolio website with a protected admin dashboard.

The public website presents:

- Personal introduction
- Professional experience
- Selected projects
- Contact information and social links

The admin dashboard provides content management capabilities for:

- About
- Experience
- Projects
- Technology Tags
- Media

All content changes are immediately reflected on the public website after being saved.

## Features

### Public Website

- Single-page scrolling layout.
- Modern editorial magazine-inspired design.
- Responsive layout for desktop, tablet, and mobile.
- About section with profile image.
- Editorial experience list.
- Asymmetric project grid.
- Project detail modal.
- Project screenshots and technology tags.
- Contact section and social media links.
- Smooth scrolling and subtle micro-interactions.

### Admin Dashboard

- Admin authentication.
- Protected dashboard routes.
- About content management.
- Experience CRUD.
- Project CRUD.
- Reusable technology tags management.
- Image upload and media management.

## Tech Stack

| Category        | Technology                              |
| --------------- | --------------------------------------- |
| Framework       | Next.js (App Router)                    |
| Language        | TypeScript                              |
| UI Library      | React                                   |
| Styling         | Tailwind CSS                            |
| Animation       | Motion                                  |
| Backend         | Next.js Server Actions & Route Handlers |
| Database        | PostgreSQL (Supabase)                   |
| Authentication  | Supabase Auth                           |
| File Storage    | Supabase Storage                        |
| Validation      | Zod                                     |
| Form Management | React Hook Form                         |
| Hosting         | Vercel                                  |

Refer to `TECH_STACK.md` for the approved technology details.

## Project Documentation

The project documentation is organized as follows:

| Document          | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `PRD.md`          | Product requirements and project scope                  |
| `DESIGN.md`       | Visual direction, layout, typography, and interactions  |
| `FEATURES.md`     | Public website and CMS functionality                    |
| `TECH_STACK.md`   | Technology choices and dependencies                     |
| `ARCHITECTURE.md` | Application architecture and folder structure           |
| `DATA_MODEL.md`   | Database entities, relationships, and constraints       |
| `TASKS.md`        | Development checklist and acceptance criteria           |
| `AGENTS.md`       | Instructions and development rules for AI coding agents |

Read these documents before implementing features or modifying the architecture.

## Prerequisites

Make sure the following tools are installed:

- Node.js (LTS version recommended)
- npm
- A Supabase project
- A code editor

## Getting Started

### 1. Install Dependencies

Clone or open the project locally, then install its dependencies.

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Fill in the values from your Supabase project settings.

**Security Notes:**

- Never commit `.env.local`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code.
- Use server-side operations for privileged administrative actions.
- Keep environment variables consistent with the Supabase client implementation.

### 3. Configure Supabase

Follow `DATA_MODEL.md` and `ARCHITECTURE.md` to configure the Supabase project.

Required setup:

- Create the database tables and relationships.
- Configure constraints and indexes.
- Apply Row Level Security policies.
- Configure Supabase Storage.
- Configure authentication.
- Configure the admin allowlist and initial admin access.

Use the approved database schema as the source of truth. Do not introduce additional tables or fields without approval.

### 4. Run the Development Server

```bash
npm run dev
```

Open the local development URL:

```text
http://localhost:3000
```

### 5. Build for Production

To verify the production build locally:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

## Environment Variables

| Variable                        | Purpose                                    | Exposure    |
| ------------------------------- | ------------------------------------------ | ----------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                       | Public      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client key                        | Public      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Privileged server-side Supabase operations | Server-only |

Additional environment variables may be introduced only when required by the approved architecture.

## Content Publishing Behavior

This project uses an immediate publishing model.

- Saving About changes updates the public About section.
- Saving an Experience entry makes it visible publicly.
- Saving a Project makes it visible in the public project grid.
- No draft status or manual publishing workflow exists.
- No `is_published` field is used.

## Development Guidelines

Before making changes:

1. Read the project documentation.
2. Understand the existing application structure.
3. Check the relevant database entities and relationships.
4. Follow the design system and approved requirements.
5. Implement incrementally.
6. Validate changes before marking tasks as completed.
7. Update `TASKS.md` after completing tasks.

Refer to `AGENTS.md` for detailed AI coding agent instructions.

## Scope Limitations

The current project scope does not include:

- Blog or article management.
- Separate project detail pages.
- Draft and publishing workflows.
- Multi-role administration.
- Advanced analytics dashboard.

Do not add these features without explicit approval.

## License

This project is a personal portfolio. All rights reserved unless otherwise specified.
