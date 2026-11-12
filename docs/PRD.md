# Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** Personal Developer Portfolio  
**Product Type:** Personal Portfolio Website with Basic CMS  
**Product Positioning:** Software Engineer Portfolio

### Description

A personal portfolio website designed to showcase professional identity, career experience, and selected software development projects.

The website combines a minimalist, interactive, and modern editorial magazine aesthetic with clear information architecture.

The platform also includes a private admin dashboard with a Basic Content Management System (CMS), allowing the owner to manage portfolio content without modifying source code.

## 2. Product Objectives

1. Establish a professional online presence as a Software Engineer.
2. Showcase personal background and professional experience.
3. Present selected projects through visual-oriented project showcases.
4. Provide an engaging and memorable browsing experience.
5. Enable sustainable content management through an admin dashboard.

## 3. Target Audience

- Recruiters and hiring managers.
- Software engineering teams.
- Potential employers and collaborators.
- Developers and people interested in the showcased projects.

## 4. Professional Identity

**Primary Role:** Software Engineer

**Educational Background:** Informatics Engineering Graduate (Fresh Graduate).

**Professional Experience:**

- UI/UX Designer
- Fullstack Developer
- Frontend Developer

The portfolio should communicate a combination of software engineering capabilities, frontend development, and design awareness.

## 5. Website Structure

The website uses a single-page scrolling layout.

### 5.1 Header / Navigation

Navigation items:

- Work
- About
- Contact

Requirements:

- Navigation links scroll to their respective sections.
- Header appears at the top of the page.
- Header is not sticky or fixed.

### 5.2 Hero Section

Purpose: Introduce the owner's professional identity.

Requirements:

- Typography-focused presentation.
- Large and bold Swiss/Grotesk-style typography.
- Prominent Software Engineer identity.
- Short professional introduction.
- No personal photograph as the main hero element.

### 5.3 About Section

Purpose: Present personal background and professional experience.

Layout:

- Split layout.
- Personal photograph on the left.
- Personal introduction on the right.

Requirements:

- Display one personal photograph.
- Display personal introduction and educational background.
- Include Experience as a subsection within About.
- About and Experience should remain visually separated through spacing and typography hierarchy.

#### Personal Photo Interaction

- Implement subtle magnetic movement.
- Photo moves slightly according to cursor position.
- Suggested maximum movement: approximately 4–6 pixels.
- Use smooth easing.
- Return to the original position when the cursor leaves.
- No 3D perspective or rotation.
- Disable or simplify the effect on touch devices.

#### Experience

Display career history using an editorial list.

Each experience contains:

- Period.
- Position.
- Company.

Requirements:

- No experience description.
- Display the most recent experience first.
- Use subtle dividers and clear typography hierarchy.

### 5.4 Work Section

Purpose: Showcase selected projects.

Layout:

- Asymmetric editorial grid.
- Project preview sizes and positions may vary.
- Use generous whitespace and visual hierarchy.

Each project contains:

- Project name.
- Short overview.
- UI screenshots or visual previews.
- Tech stack tags.
- Live website URL.

#### Project Detail Modal

When visitors select a project, display its details in an interactive modal.

Modal content:

- Project name.
- Project overview.
- UI screenshots.
- Tech stack tags.
- Link to the live website.

Requirements:

- No separate project detail page.
- Provide a clear close interaction.
- Preserve the context of the main portfolio page.
- Use smooth opening and closing transitions.

### 5.5 Contact Section

Purpose: Encourage visitors to connect with the owner.

Design direction:

- Bold editorial composition.
- Oversized typography.
- Prominent contact headline, such as "LET'S TALK".
- Email as the primary contact method.
- Social media links.

### 5.6 Footer

Design direction:

- Minimalist.
- Copyright information.
- Owner's name or personal branding.
- Avoid unnecessary decorative elements.

## 6. Admin Dashboard

### 6.1 Overview

A private admin dashboard that allows the owner to manage public portfolio content.

### 6.2 Authentication

- Provide an admin login mechanism.
- Protect admin dashboard routes.
- Restrict content management actions to authenticated and authorized administrators.
- Public visitors do not need authentication.

### 6.3 Content Management

The CMS must support CRUD operations for:

**About**

- Create.
- Read.
- Update.
- Delete.

**Experience**

- Create.
- Read.
- Update.
- Delete.

**Projects**

- Create.
- Read.
- Update.
- Delete.

### 6.4 Tech Stack Tags Management

Provide reusable technology tags for projects.

Requirements:

- Create new tags.
- Read existing tags.
- Update tags.
- Delete tags.
- Select existing tags when creating or editing a project.
- Associate multiple tags with one project.
- Reuse one tag across multiple projects.
- Prevent duplicate tags.

Example:

- TypeScript
- Go
- React
- PostgreSQL
- Next.js

### 6.5 Image Management

- Allow administrators to upload project images.
- Allow administrators to manage personal and project imagery.
- Images must be available to the public website when associated content is published.

## 7. Design Requirements

### Visual Direction

**Modern Editorial Magazine**

Core principles:

- Minimalist.
- Interactive.
- Aesthetic.
- Informative.
- Strong typography hierarchy.
- Generous whitespace.
- Asymmetric composition.

### Typography

**Modern Swiss / Grotesk Sans-serif**

Requirements:

- Bold oversized headlines.
- Clean body typography.
- Strong information hierarchy.
- Avoid excessive font variations.

### Color Direction

- Primary background: Off-white.
- Primary text: Charcoal.
- Accent: Muted Blue.
- Supporting colors: White, Soft Gray, and Light Blue.

Suggested accent color: `#607FAD` (proposed token).

### Interaction Principles

- Subtle and intentional animations.
- Smooth scrolling.
- Micro-interactions.
- Image hover interactions.
- Project modal transitions.
- Avoid excessive animation that interferes with readability.

## 8. Scope Boundaries

### Included in MVP

- Single-page public portfolio.
- About and Experience sections.
- Asymmetric project showcase.
- Interactive project modal.
- Contact and social media links.
- Minimalist footer.
- Admin authentication.
- Basic CMS.
- Reusable tech stack tags.
- Image management.

### Not Included in Current Scope

The following features are not part of the agreed MVP:

- Blog or article management.
- Separate project detail pages.
- Advanced CMS capabilities.
- Multi-role administration.
- Complex analytics dashboard.
- Additional pages unrelated to the agreed portfolio structure.

## 9. Non-Functional Requirements

- Responsive design across desktop, tablet, and mobile.
- Good performance and optimized image delivery.
- Maintainable and reusable code structure.
- Secure admin authentication and protected operations.
- Accessible navigation and interactive components.
- Graceful handling of loading and error states.

## 10. Success Criteria

The project is considered successful when:

1. Visitors can clearly understand the owner's professional identity.
2. Visitors can explore About, Experience, and Projects easily.
3. Project details can be accessed through modal interactions.
4. The website delivers the intended editorial visual experience.
5. The owner can manage all agreed content through the admin dashboard.
6. Tech stack tags can be created and reused across projects.
7. Public content updates are reflected on the portfolio website without manual source-code modifications.

## 11. Open Decisions

The following details must be finalized in subsequent documentation:

- Final technology stack.
- Frontend and backend architecture.
- Database selection and schema.
- Authentication implementation.
- Image storage provider.
- Exact typography and font selection.
- Final color tokens.
- Detailed responsive behavior.
- Admin dashboard UI structure.
- Content publishing behavior.
