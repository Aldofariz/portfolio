export type HeroIconKey =
  | "idCard"
  | "laptop"
  | "gear"
  | "brick"
  | "palette"
  | "rocket"
  | "coffee";

export interface HeroWord {
  text: string;
  iconAfter?: Exclude<HeroIconKey, "idCard">;
  italic?: boolean;
}

export const HERO_CONTENT = {
  availability: "Available for software engineering roles · 2026",
  headline: [
    { text: "Software", iconAfter: "laptop" },
    { text: "engineer" },
    { text: "who" },
    { text: "builds" },
    { text: "resilient", iconAfter: "gear" },
    { text: "distributed" },
    { text: "systems," },
    { text: "clean", iconAfter: "brick" },
    { text: "architecture," },
    { text: "and" },
    { text: "thoughtful", iconAfter: "palette" },
    { text: "interfaces," },
    { text: "turning" },
    { text: "ideas" },
    { text: "into", iconAfter: "rocket" },
    { text: "products", italic: true },
    { text: "people", italic: true },
    { text: "actually", iconAfter: "coffee", italic: true },
    { text: "enjoy", italic: true },
    { text: "using.", italic: true },
  ] satisfies HeroWord[],
  subtext:
    "Bridging resilient distributed systems, modern software architecture, and design awareness. Focused on crafting disciplined, high-impact digital experiences.",
  primaryAction: "Selected Works",
  secondaryAction: "Profile & Experience",
  badge: "Aldo Fariz Fadilla // Informatics Engineering Graduate",
} as const;
