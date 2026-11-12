# DESIGN.md

# Design System & Visual Guidelines

## 1. Design Direction

**Concept:** Modern Editorial Magazine

The portfolio should feel like a modern editorial magazine combined with a professional software engineer portfolio.

The design must be:

- Minimalist but visually distinctive.
- Interactive without excessive animation.
- Editorial, with strong typography and visual hierarchy.
- Asymmetric rather than relying on generic card layouts.
- Spacious, clean, and easy to navigate.
- Professional and informative.

Avoid:

- Generic SaaS landing page aesthetics.
- Excessive gradients and glowing effects.
- Unnecessary decorative elements.
- Too many rounded cards.
- Excessive animation that harms readability or performance.

## 2. Layout & Structure

The website uses a single-page scrolling layout.

Section order:

1. Hero
2. About
3. Work
4. Contact
5. Footer

### Header

- Navigation links: Work, About, Contact.
- Appears at the top of the page.
- Not sticky or fixed.
- Minimalist styling.
- Navigation links scroll to their respective sections.
- Smooth scrolling is preferred.

### Hero

- Strong introductory headline.
- Clearly communicate the Software Engineer positioning.
- Include a short supporting introduction.
- Establish the visual identity immediately.
- Keep the composition clean and spacious.

### About

Use a split layout:

- Left: one personal photograph.
- Right: personal introduction and experience.

Personal introduction and Experience should be separate subsections with clear visual hierarchy.

Personal image interaction:

- Subtle magnetic movement following cursor position.
- Maximum movement approximately 4–6 pixels.
- Smooth easing.
- Return to original position when the cursor leaves.
- No rotation, 3D perspective, or multidirectional tilt.
- Disable or simplify the effect on touch devices.

### Experience

Use an editorial list instead of cards.

Each entry displays:

- Period.
- Position.
- Company.

Requirements:

- Most recent experience first.
- No long descriptions.
- Subtle dividers.
- Clear typographic hierarchy.
- Clean spacing between entries.

### Work

Use an **Asymmetric Editorial Grid**.

Requirements:

- Project previews may have different sizes and positions.
- Use whitespace to establish hierarchy.
- Avoid making every project look like an identical card.
- Images/screenshots should be the main visual element.
- Project name, overview, and technology tags should remain readable.

### Project Modal

Clicking a project opens an editorial-style modal.

Visual requirements:

- Prominent project title.
- Short overview.
- Large project screenshots.
- Technology tags.
- Live website link.
- Clear close interaction.
- Smooth opening and closing transitions.
- Preserve the user's context on the main page.

### Contact

Use a Bold Editorial direction.

Requirements:

- Oversized headline, such as "LET'S TALK".
- Email as the primary contact method.
- Social media links.
- Minimal supporting content.
- Subtle hover interactions.

### Footer

- Minimalist.
- Copyright information.
- Personal name or branding.
- No unnecessary content.

## 3. Typography

**Direction:** Modern Swiss / Grotesk Sans-serif.

Typography characteristics:

- Bold, oversized headlines.
- Clean and highly readable body text.
- Clear distinction between headings, labels, and body content.
- Consistent type scale.
- No serif font as the primary typeface.

Exact font family and font sizes remain implementation decisions to be finalized during technical/design setup.

## 4. Color System

**Direction:** Neutral monochrome with muted blue accent.

Proposed palette:

| Token      | Proposed Color          | Usage                       |
| ---------- | ----------------------- | --------------------------- |
| Background | Off-white               | Main page background        |
| Foreground | Charcoal                | Primary text                |
| Accent     | #607FAD                 | Links and selected accents  |
| Surface    | Soft white / light gray | Supporting surfaces         |
| Muted      | Soft gray               | Secondary text and dividers |

The exact color tokens may be adjusted during implementation, but the overall direction must remain restrained and cohesive.

Avoid:

- Bright neon accents.
- Too many competing colors.
- High-saturation gradients.

## 5. Spacing & Composition

- Prioritize generous whitespace.
- Use consistent spacing relationships.
- Allow asymmetry in editorial sections.
- Maintain alignment and readability.
- Avoid overly dense layouts.
- Ensure the composition feels intentional rather than randomly positioned.

## 6. Interaction & Motion

Allowed interactions:

- Smooth scrolling.
- Subtle hover states.
- Micro-interactions.
- Image transitions.
- Selective scroll-based animations.
- Project modal transitions.
- Subtle magnetic movement on the personal image.

Motion principles:

- Keep animations smooth and restrained.
- Avoid excessive movement.
- Prioritize readability and performance.
- Respect reduced-motion preferences.
- Simplify cursor-dependent effects on touch devices.

## 7. Responsive Design

The website must work across:

- Desktop.
- Tablet.
- Mobile.

Responsive requirements:

- Preserve the editorial visual identity at every breakpoint.
- Reorganize asymmetric layouts when screen space is limited.
- Stack the About split layout on smaller screens when necessary.
- Make project previews readable and usable on mobile.
- Ensure the project modal works on smaller screens.
- Prevent horizontal overflow.
- Maintain comfortable typography and spacing.

Exact breakpoints are implementation decisions.

## 8. Accessibility & Usability

- Maintain sufficient text contrast.
- Use semantic HTML.
- Provide accessible names for interactive controls.
- Ensure navigation and modal interactions are keyboard accessible.
- Provide visible focus states.
- Do not rely solely on color to communicate information.
- Respect `prefers-reduced-motion`.

## 9. Performance

- Optimize images.
- Avoid unnecessary animation libraries or heavy effects.
- Lazy-load images where appropriate.
- Avoid layout shifts when images load.
- Keep interactions responsive.
- Prioritize content readability over decorative effects.

## 10. Design Principles for Implementation

When implementing the design:

1. Visual hierarchy comes before decoration.
2. Content must remain the primary focus.
3. Whitespace is an intentional design element.
4. Asymmetry must remain visually balanced.
5. Interactions should support the experience, not distract from it.
6. Responsive behavior must be considered from the beginning.
7. Avoid introducing design patterns that conflict with the editorial direction.
