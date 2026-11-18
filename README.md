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

Configure the Supabase project with the database schema and policies required by the application:

- Create the database tables and relationships.
- Configure constraints and indexes.
- Apply Row Level Security policies.
- Configure Supabase Storage.
- Configure authentication.
- Configure the admin allowlist and initial admin access.

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


## Scope Limitations

The current project scope does not include:

- Blog or article management.
- Separate project detail pages.
- Draft and publishing workflows.
- Multi-role administration.
- Advanced analytics dashboard.

## License

This project is a personal portfolio. All rights reserved unless otherwise specified.
