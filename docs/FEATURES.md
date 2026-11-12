# FEATURES.md

# Feature Specifications

## 1. Overview

This document defines the expected behavior of the public portfolio website and its Basic CMS admin dashboard.

It serves as an implementation reference for developers and AI coding agents.

## 2. Public Website

### 2.1 Header Navigation

**Description:** Navigation for moving between the main portfolio sections.

Navigation items:

- Work
- About
- Contact

Behavior:

- Clicking an item scrolls to the corresponding section.
- Use smooth scrolling where supported.
- Header is not sticky or fixed.
- Navigation remains usable on mobile.

Acceptance criteria:

- All navigation links point to valid sections.
- Clicking a link moves the visitor to the correct section.
- No broken navigation targets.

### 2.2 Hero Section

**Description:** Introduces the portfolio owner and professional positioning.

Content:

- Name.
- Software Engineer positioning.
- Short introductory statement.

Acceptance criteria:

- Professional identity is immediately understandable.
- Main headline is visually prominent.
- Layout works on desktop and mobile.

### 2.3 About Section

**Description:** Presents the owner's personal introduction and experience.

Content:

- Personal photograph.
- Personal introduction.
- Experience subsection.

Behavior:

- Personal photo supports subtle magnetic cursor movement on desktop.
- Movement is limited to approximately 4–6 pixels.
- Image returns to its original position when the cursor leaves.
- Effect is disabled or simplified on touch devices.

Acceptance criteria:

- Only one personal photo is displayed.
- Introduction and Experience are visually distinct subsections.
- Magnetic movement does not interfere with usability.
- The section remains readable on mobile.

### 2.4 Experience

**Description:** Displays professional experience in an editorial list.

Each entry contains:

- Period.
- Position.
- Company.

Behavior:

- Most recent experience appears first.
- No long experience descriptions.
- Entries are separated visually using subtle dividers.

Acceptance criteria:

- Each experience displays its period, position, and company.
- Ordering is consistent and predictable.
- Empty experience data is handled gracefully.

### 2.5 Work / Projects

**Description:** Displays selected projects using an asymmetric editorial grid.

Each project contains:

- Project name.
- Short overview.
- Preview image or screenshots.
- Technology tags.
- Live website URL.

Behavior:

- Projects are displayed in an editorial grid.
- Different project preview sizes and positions may be used.
- Clicking a project opens its project modal.
- Project data is obtained from the CMS-managed content.

Acceptance criteria:

- Each published project displays its available information.
- Project previews are responsive.
- Missing optional data does not break the layout.
- Project ordering follows the configured order.

### 2.6 Project Modal

**Description:** Shows additional project information without navigating to a separate detail page.

Content:

- Project name.
- Overview.
- Screenshots.
- Technology tags.
- Live website URL.

Behavior:

- Opens when a visitor selects a project.
- Closes using a close button.
- Supports Escape key.
- Clicking the backdrop may close the modal.
- Prevents unintended interaction with the page behind the modal.
- Opening and closing transitions are smooth.
- Closing returns the visitor to the previous page context.

Acceptance criteria:

- Correct project data is displayed.
- Modal can be opened and closed reliably.
- Keyboard interaction is supported.
- Modal content remains usable on mobile.
- External live website links open the correct destination.

### 2.7 Contact Section

**Description:** Provides a direct way to contact the portfolio owner.

Content:

- Prominent contact headline.
- Email address.
- Social media links.

Behavior:

- Email link uses `mailto:`.
- Social links navigate to their configured destinations.
- External links use appropriate security attributes when opened in a new tab.

Acceptance criteria:

- Email link opens the visitor's configured email application.
- Social links point to valid destinations.
- Contact information is easy to find.

### 2.8 Footer

**Description:** Provides minimal closing information.

Content:

- Copyright information.
- Personal branding or name.

Acceptance criteria:

- Footer is visible at the bottom of the page.
- Copyright information is configurable.
- Layout remains responsive.

## 3. Admin Dashboard

### 3.1 Authentication

**Description:** Protects administrative functionality.

Requirements:

- Admin login.
- Authenticated access to protected admin routes.
- Logout.
- Public portfolio remains accessible without authentication.

Acceptance criteria:

- Unauthenticated visitors cannot access protected admin pages.
- Invalid login credentials are rejected.
- Authenticated admins can access permitted CMS functionality.
- Logout invalidates the authenticated session.
- Authorization is enforced on the server, not only by hiding frontend UI.

### 3.2 Admin Dashboard Overview

**Description:** Provides an entry point for managing portfolio content.

Requirements:

- Navigation to About, Experience, Projects, and Tags management.
- Navigation to image management where applicable.
- Logout action.

The dashboard should remain simple. An advanced analytics dashboard is outside the MVP scope.

### 3.3 About Management

**Description:** Allows the admin to manage personal introduction content.

Operations:

- Create or initialize About content.
- Read current content.
- Update content.

Fields:

- Personal introduction text.
- Personal photo reference.

Acceptance criteria:

- Admin can update the introduction.
- Admin can upload or select the personal photo.
- Updated content appears on the public website after successful publication or saving, according to the chosen publishing behavior.

### 3.4 Experience Management

**Description:** Allows the admin to manage experience entries.

Operations:

- Create.
- Read.
- Update.
- Delete.

Fields:

- Period.
- Position.
- Company.
- Display order.

Behavior:

- Entries are displayed most recent first by default.
- Admin can configure ordering if custom ordering is supported by the final data model.

Acceptance criteria:

- Admin can perform all CRUD operations.
- Required fields are validated.
- Public experience list reflects saved data.
- Deleted entries no longer appear publicly.

### 3.5 Project Management

**Description:** Allows the admin to manage portfolio projects.

Operations:

- Create.
- Read.
- Update.
- Delete.

Fields:

- Project name.
- Short overview.
- Preview image or screenshots.
- Technology tags.
- Live website URL.
- Display order.

Behavior:

- Admin can associate multiple tags with one project.
- Admin can reuse existing tags.
- Admin can select multiple images for a project.
- Project order can be managed.
- Public visitors see only projects intended for public display, subject to the final publishing model.

Acceptance criteria:

- Admin can create, edit, view, and delete projects.
- Project fields are validated.
- Multiple technology tags can be assigned.
- Multiple screenshots can be associated with a project.
- Saved project data appears correctly on the public website.

### 3.6 Technology Tag Management

**Description:** Provides reusable technology tags shared across projects.

Operations:

- Create.
- Read.
- Update.
- Delete.

Examples:

- TypeScript.
- Go.
- React.
- PostgreSQL.
- Next.js.

Behavior:

- A project can have multiple tags.
- One tag can be reused by multiple projects.
- Admin can select existing tags when creating or editing a project.
- Duplicate tags should be prevented.
- Tag names should be normalized consistently to avoid accidental duplicates caused by casing or whitespace.

Acceptance criteria:

- Tags can be managed independently.
- Existing tags can be reused.
- Multiple tags can be assigned to one project.
- Duplicate tag records are prevented.
- Deleting a tag must handle existing project associations safely.

### 3.7 Image Management

**Description:** Allows the admin to upload and manage images used by the portfolio.

Use cases:

- Personal photograph.
- Project preview images.
- Project screenshots.

Requirements:

- Upload images.
- Select existing uploaded images where appropriate.
- Associate images with About or Projects.
- Validate file type and size.
- Store image references rather than embedding image binaries in ordinary content records.

Acceptance criteria:

- Supported image formats are validated.
- Invalid uploads are rejected with a clear error.
- Uploaded images can be associated with the correct content.
- Images are displayed correctly on the public website.
- Image deletion must not leave broken references in published content.

Exact storage provider and upload limits are defined in technical documentation.

## 4. Data Validation & Error Handling

General requirements:

- Required fields must be validated.
- Invalid URLs must be rejected.
- Empty required values must not be saved.
- Failed operations must provide understandable feedback.
- Loading states should be shown during asynchronous operations.
- Destructive operations should require confirmation.
- Forms should preserve useful input when a request fails, where practical.

## 5. Security Requirements

- Admin routes require authentication.
- Server-side authorization is mandatory.
- Validate and sanitize user input.
- Protect upload endpoints.
- Do not expose secrets or private credentials in frontend code.
- Restrict CMS mutations to authorized admins.
- Apply appropriate session and CSRF protections based on the chosen authentication architecture.

## 6. Content & Publishing Behavior

The exact publishing model is still an open technical/product decision.

The MVP must define whether:

- Saving content immediately updates the public website; or
- Content can be saved as draft and explicitly published.

Do not implement a complex editorial workflow unless it is explicitly approved.

## 7. Out of Scope

The following features are not part of the MVP:

- Blog or article publishing.
- Separate project detail pages.
- Multi-role admin permissions.
- Advanced analytics dashboard.
- Complex content approval workflows.
- Multiple languages.
- Public user accounts.
- Comments or visitor-generated content.

## 8. Cross-Feature Quality Requirements

- Public pages must be responsive.
- Admin pages must be usable on desktop and mobile.
- Loading, empty, success, and error states must be considered.
- Interactions must be keyboard accessible where applicable.
- Reduced-motion preferences must be respected.
- Content must remain readable if optional images or fields are unavailable.
- Public pages should not expose admin-only functionality.
