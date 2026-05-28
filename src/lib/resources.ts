// Central resource registry — single source of truth for all assets.
// Downloads point to /public/resources/* for real file delivery.

import type { Role } from "@/lib/rbac";

export type ResourceCategory = "Brand" | "Typography" | "Tokens" | "Components" | "Code" | "Docs";
export type ResourceAccess   = "public" | "employee";
export type ResourceFormat   = "PNG" | "ZIP" | "PDF" | "JSON" | "CSS" | "SCSS" | "TS" | "JS" | "FIGMA" | "TTF" | "MD";

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  access: ResourceAccess;
  format: ResourceFormat;
  size: string;
  version: string;
  tags: string[];
  /** Path inside /public — null if not yet available for download */
  downloadPath: string | null;
  /** Preview type determines which preview component renders */
  previewType: "image" | "font" | "code" | "figma" | "pdf" | "none";
  previewData?: string;  // For code preview: the actual content; for fonts: sample text
  dimensions?: string;   // e.g. "4261 × 712 px"
  minRole?: Role;        // override: min role needed (default: access=public→viewer, employee→employee)
}

export const RESOURCES: Resource[] = [
  // ── Brand ──────────────────────────────────────────────────────────────────
  {
    id: "logo-horizontal",
    name: "Horizontal Logo",
    description: "Full wordmark + symbol. For headers, hero banners, OG cards. Minimum 120px wide.",
    category: "Brand", access: "public", format: "PNG", size: "2.1 MB", version: "1.0",
    tags: ["logo", "brand", "marketing"],
    downloadPath: "/resources/brand/schoolasium-logo-horizontal.png",
    previewType: "image",
    dimensions: "4261 × 712 px",
  },
  {
    id: "logo-square",
    name: "Square Mark",
    description: "Symbol + compact wordmark. Auth screens, app icons, social avatars.",
    category: "Brand", access: "public", format: "PNG", size: "1.4 MB", version: "1.0",
    tags: ["logo", "brand", "icon"],
    downloadPath: "/resources/brand/schoolasium-logo-square.png",
    previewType: "image",
    dimensions: "1318 × 1318 px",
  },
  {
    id: "logo-bw",
    name: "B&W Logo",
    description: "Monochrome version for single-colour printing and low-contrast contexts.",
    category: "Brand", access: "public", format: "PNG", size: "980 KB", version: "1.0",
    tags: ["logo", "monochrome", "print"],
    downloadPath: "/resources/brand/schoolasium-logo-bw.png",
    previewType: "image",
  },
  // ── Typography ──────────────────────────────────────────────────────────────
  {
    id: "roboto",
    name: "Roboto",
    description: "Primary UI font. Weights: 300, 400, 500, 700, 900. Used for all navigation, buttons, and headings.",
    category: "Typography", access: "public", format: "TTF", size: "890 KB", version: "3.0",
    tags: ["font", "primary", "UI"],
    downloadPath: "/resources/fonts/Roboto-Regular.ttf",
    previewType: "font",
    previewData: "Where Kids Build the Future with Code",
  },
  {
    id: "open-sans",
    name: "Open Sans",
    description: "Secondary reading font. Weights: 300, 400, 600, 700. Long-form docs and lesson content.",
    category: "Typography", access: "public", format: "TTF", size: "760 KB", version: "1.2",
    tags: ["font", "secondary", "docs"],
    downloadPath: "/resources/fonts/OpenSans-Regular.ttf",
    previewType: "font",
    previewData: "Drag blocks. Watch it work. You just programmed a robot.",
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    description: "Monospace font for code blocks, terminal output, and parameter inputs. Ligatures enabled.",
    category: "Typography", access: "public", format: "TTF", size: "540 KB", version: "2.3",
    tags: ["font", "mono", "code"],
    downloadPath: "/resources/fonts/JetBrainsMono-Regular.ttf",
    previewType: "font",
    previewData: "const robot = new Arduino({ pin: 13, mode: 'OUTPUT' });",
  },
  // ── Tokens ──────────────────────────────────────────────────────────────────
  {
    id: "design-tokens-json",
    name: "design-tokens.json",
    description: "Full token set in W3C Design Tokens format. Import into Tokens Studio or Style Dictionary.",
    category: "Tokens", access: "public", format: "JSON", size: "14 KB", version: "1.0",
    tags: ["tokens", "json", "figma"],
    downloadPath: "/resources/tokens/design-tokens.json",
    previewType: "code",
    previewData: `{\n  "$schema": "https://design-tokens.org/schema.json",\n  "name": "schoolasium",\n  "version": "1.0.0",\n  "color": {\n    "primary": {\n      "500": { "value": "#EAB308", "description": "Schoolasium brand yellow" }\n    }\n  }\n}`,
  },
  {
    id: "tokens-css",
    name: "tokens.css",
    description: "CSS custom properties for all design tokens. Drop into any project as the first stylesheet.",
    category: "Tokens", access: "public", format: "CSS", size: "8 KB", version: "1.0",
    tags: ["tokens", "css", "variables"],
    downloadPath: "/resources/tokens/tokens.css",
    previewType: "code",
    previewData: `:root {\n  --color-primary-500: #EAB308;\n  --color-secondary-500: #06B6D4;\n  --color-accent-500: #8B5CF6;\n  --font-primary: "Roboto", system-ui, sans-serif;\n  --radius-xl: 12px;\n  --space-4: 1rem;\n}`,
  },
  {
    id: "tokens-scss",
    name: "_tokens.scss",
    description: "SCSS partial with all design tokens as Sass variables. Fully compatible with the CSS var output.",
    category: "Tokens", access: "public", format: "SCSS", size: "9 KB", version: "1.0",
    tags: ["tokens", "scss", "sass"],
    downloadPath: "/resources/tokens/_tokens.scss",
    previewType: "code",
    previewData: `$color-primary-500: #EAB308;\n$color-secondary-500: #06B6D4;\n$font-primary: "Roboto", system-ui, sans-serif;\n$radius-xl: 12px;\n$space-4: 1rem;`,
  },
  {
    id: "tailwind-config-ts",
    name: "tailwind.config.ts",
    description: "Tailwind v4 config extending the Schoolasium palette, shadows, radius, and animation tokens.",
    category: "Tokens", access: "public", format: "TS", size: "6 KB", version: "1.0",
    tags: ["tailwind", "config", "tokens"],
    downloadPath: "/resources/tokens/tailwind.config.ts",
    previewType: "code",
    previewData: `import type { Config } from 'tailwindcss'\n\nconst config: Config = {\n  theme: {\n    extend: {\n      colors: {\n        primary: { 500: '#EAB308' },\n        secondary: { 500: '#06B6D4' },\n      }\n    }\n  }\n}\n\nexport default config`,
  },
  // ── Components (employee-only) ──────────────────────────────────────────────
  {
    id: "figma-kit",
    name: "Figma UI Kit",
    description: "Full component library with auto-layout, variants, and design tokens wired to the Figma Tokens plugin.",
    category: "Components", access: "employee", format: "FIGMA", size: "18 MB", version: "1.0",
    tags: ["figma", "design", "components"],
    downloadPath: null, // cloud file — external link in real system
    previewType: "figma",
  },
  // ── Code ────────────────────────────────────────────────────────────────────
  {
    id: "eslint-config",
    name: "ESLint + Prettier Config",
    description: "Opinionated linting and formatting rules matching the Schoolasium code standards.",
    category: "Code", access: "public", format: "JSON", size: "4 KB", version: "1.0",
    tags: ["eslint", "prettier", "config"],
    downloadPath: null,
    previewType: "code",
    previewData: `{\n  "extends": ["next/core-web-vitals", "prettier"],\n  "rules": {\n    "no-console": "warn",\n    "prefer-const": "error"\n  }\n}`,
  },
  // ── Docs ────────────────────────────────────────────────────────────────────
  {
    id: "master-md",
    name: "MASTER.md",
    description: "The complete design system specification — brand, color, typography, motion, accessibility, and component contracts.",
    category: "Docs", access: "public", format: "MD", size: "68 KB", version: "1.0",
    tags: ["docs", "spec", "brand"],
    downloadPath: "/resources/docs/MASTER.md",
    previewType: "code",
    previewData: `# Schoolasium Design System\n\n**Version:** 1.0.0\n**Status:** Production\n\n> "Where Kids Build the Future with Code"\n\nA futuristic, premium IDE-style design system for a visual programming\nand robotics education platform.`,
  },
];

// ── Lookup helpers ────────────────────────────────────────────────────────────

export function getResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return RESOURCES.filter((r) => r.category === category);
}

export function canAccessResource(resource: Resource, role: Role | undefined): boolean {
  if (resource.access === "public") return true;
  if (!role) return false;
  if (resource.minRole) {
    const hierarchy = ["super_admin", "admin", "employee", "viewer"];
    return hierarchy.indexOf(role) <= hierarchy.indexOf(resource.minRole);
  }
  return role !== "viewer";
}
