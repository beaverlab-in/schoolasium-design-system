# Schoolasium Design System

**Version:** 1.0.0
**Last Updated:** May 2026
**Maintainers:** Schoolasium Design & Engineering
**Status:** Production

> *"Where Kids Build the Future with Code"*

A futuristic, premium IDE-style design system for a visual programming and robotics education platform. Built for kids, trusted by teachers, scalable for institutions.

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Logo System](#2-logo-system)
3. [Color System](#3-color-system)
4. [Typography System](#4-typography-system)
5. [Spacing & Layout](#5-spacing--layout)
6. [UI Components](#6-ui-components)
7. [Icons & Illustrations](#7-icons--illustrations)
8. [Motion & Animation](#8-motion--animation)
9. [Accessibility Standards](#9-accessibility-standards)
10. [Tone of Voice & Content](#10-tone-of-voice--content)
11. [Design Tokens (CSS Variables)](#11-design-tokens-css-variables)
12. [Documentation Style](#12-documentation-style)
13. [Future Expansion](#13-future-expansion)

---

## 1. Brand Foundation

### 1.1 Identity

| Attribute | Value |
|---|---|
| **Name** | Schoolasium |
| **Tagline** | Where Kids Build the Future with Code |
| **Category** | EdTech · Robotics Education · Visual Programming |
| **Mission** | Make coding and robotics feel like a creative playground for young learners. |

### 1.2 Personality Pillars

The brand sits at the intersection of four references — pick any UI decision against this matrix:

- **Scratch** — beginner-friendly, drag-and-drop, low fear
- **Figma** — polished, professional, modern surfaces
- **VSCode** — productive, IDE-grade, dark-mode-first
- **Framer** — smooth motion, premium feel, delightful micro-interactions

**Voice:** Modern · Futuristic · Playful but professional · Tech-focused · Creative · Educational · Beginner-friendly · Innovation-driven.

### 1.3 Audience

**Primary:** Children (8–18) learning coding, robotics, Arduino, and STEM.
**Secondary:** Teachers, coding institutes, robotics labs, STEM startups, parents.
**Skill range:** Beginner → Intermediate.

### 1.4 Experience Promise

When a user lands, they should feel:

- Excited to create
- Safe to experiment
- Curious and inspired
- Immersed in a futuristic learning lab

They should think: *"I can actually build cool things here."*

Avoid feeling like: a boring dashboard, a kiddie app, or a corporate LMS.

---

## 2. Logo System

### 2.1 Asset Inventory

| Asset | Path | Size | Use |
|---|---|---|---|
| Primary horizontal logo | `/schoolasium-logo4261X712.png` | 4261×712 | Marketing site headers, hero banners, OG cards |
| Square mark | `/schoolasium-sq-logo1318X1318.png` | 1318×1318 | Auth screens, app icons, social avatars |
| Android Chrome (large) | `/android-chrome-512x512.png` | 512×512 | PWA install icon |
| Android Chrome (small) | `/android-chrome-192x192.png` | 192×192 | PWA shortcut |
| Apple touch icon | `/apple-touch-icon.png` | 180×180 | iOS home screen |
| Favicon (large) | `/favicon-32x32.png` | 32×32 | Browser tab |
| Favicon (small) | `/favicon-16x16.png` | 16×16 | Browser tab (legacy) |

### 2.2 Variants

- **Primary** — full wordmark + symbol (horizontal). Default for navigation bar and footer.
- **Secondary (square)** — symbol + compact wordmark. For app launchers, auth, splash screens.
- **Icon-only (favicon set)** — for browser tabs, PWAs, and constrained UI surfaces.

### 2.3 Usage Rules

- **Minimum size (horizontal):** 120px wide on web · 24pt in print.
- **Minimum size (square mark):** 32×32 on web · 16×16 only when system requires a favicon.
- **Clear space:** Maintain padding equal to the height of the "S" letterform on all sides — no other element should encroach.
- **Background pairing:**
  - On `--color-dark-bg`: use the standard logo (yellow on dark reads strong).
  - On `--color-light-bg`: use the standard logo at full opacity.
  - On photographic or busy backgrounds: place inside a `--color-dark-surface` chip with 12px padding and 12px radius.
- **Never:** stretch, rotate, recolor outside the brand palette, place on low-contrast yellow surfaces, or apply drop shadows other than `--shadow-glow-primary`.

### 2.4 File Format Roadmap

Current: PNG raster assets only.
**Recommended next step:** commission SVG versions of both the horizontal logo and square mark for crisp rendering at any size and theme-aware coloring via `currentColor`.

---

## 3. Color System

### 3.1 Color Philosophy

Yellow (`#EAB308`) is the brand anchor — energetic, optimistic, attention-grabbing. To keep the experience IDE-grade and not childish, yellow is paired with:

- **Deep slate/navy** for IDE surfaces (the VSCode/Linear influence)
- **Electric cyan** for technology and action affordances
- **Muted violet** for creativity and accent moments
- **Restrained semantic colors** that don't fight the brand yellow

In **dark mode** (default), bright colors are intentionally muted — saturated cyan, controlled blue, and dusty violet — to keep long workspace sessions comfortable.

### 3.2 Primary — Schoolasium Yellow

The brand color. Use for primary CTAs, brand moments, and the logo. Use sparingly in dense UI — yellow loses power when overused.

| Token | Hex | Use |
|---|---|---|
| `--color-primary-50`  | `#FEFCE8` | Lightest tint, hover backgrounds (light theme) |
| `--color-primary-100` | `#FEF9C3` | Subtle badges, hover states |
| `--color-primary-200` | `#FEF08A` | Block highlights (light theme) |
| `--color-primary-300` | `#FDE047` | Active block outlines |
| `--color-primary-400` | `#FACC15` | Hover state of primary CTAs |
| `--color-primary-500` | `#EAB308` | **Brand color** — primary CTAs, logo, focused blocks |
| `--color-primary-600` | `#CA8A04` | Pressed/active CTA state |
| `--color-primary-700` | `#A16207` | Text on primary tints (light theme) |
| `--color-primary-800` | `#854D0E` | Headings on yellow backgrounds |
| `--color-primary-900` | `#713F12` | Maximum contrast on yellow surfaces |

### 3.3 Secondary — Tech Cyan

The "circuit" color. Used for links, secondary actions, sensor/data indicators, and any "live" or "running" state.

| Token | Hex | Use |
|---|---|---|
| `--color-secondary-50`  | `#ECFEFF` | Subtle highlight on light theme |
| `--color-secondary-100` | `#CFFAFE` | Info chip backgrounds |
| `--color-secondary-300` | `#67E8F9` | Dark-mode glow accents |
| `--color-secondary-400` | `#22D3EE` | Dark-mode link hover |
| `--color-secondary-500` | `#06B6D4` | **Secondary action color** — links, ports, wires |
| `--color-secondary-600` | `#0891B2` | Pressed state |
| `--color-secondary-700` | `#0E7490` | Text on cyan tints |
| `--color-secondary-900` | `#164E63` | Deepest cyan, used rarely |

### 3.4 Accent — Creator Violet

Used for "create," "build," "imagine" moments — empty-state CTAs, achievements, premium features, AI suggestions.

| Token | Hex | Use |
|---|---|---|
| `--color-accent-300` | `#C4B5FD` | Soft glow accents |
| `--color-accent-400` | `#A78BFA` | Hover/glow on dark theme |
| `--color-accent-500` | `#8B5CF6` | **Accent color** — creative actions, achievements |
| `--color-accent-600` | `#7C3AED` | Pressed state |
| `--color-accent-700` | `#6D28D9` | Text on violet tints |

### 3.5 Neutrals — Slate (IDE Foundation)

The structural color. Use for backgrounds, surfaces, text, borders. This is what gives the platform its "VSCode-grade" feel.

| Token | Hex | Use |
|---|---|---|
| `--color-neutral-0`   | `#FFFFFF` | Pure white (light theme bg) |
| `--color-neutral-50`  | `#F8FAFC` | Light theme app background |
| `--color-neutral-100` | `#F1F5F9` | Light theme elevated surface |
| `--color-neutral-200` | `#E2E8F0` | Light theme border |
| `--color-neutral-300` | `#CBD5E1` | Disabled text on light, hover border |
| `--color-neutral-400` | `#94A3B8` | Placeholder text, muted icons |
| `--color-neutral-500` | `#64748B` | Secondary text (both themes) |
| `--color-neutral-600` | `#475569` | Body text (light theme) |
| `--color-neutral-700` | `#334155` | Dark theme borders / strong dividers |
| `--color-neutral-800` | `#1F2937` | Dark theme elevated surface |
| `--color-neutral-900` | `#111827` | Dark theme surface |
| `--color-neutral-950` | `#0A0E1A` | Dark theme app background |

### 3.6 Semantic Colors

Tuned to coexist with brand yellow — slightly desaturated greens/reds so the UI doesn't fight itself.

| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#22C55E` | Project saved, code compiled, board connected |
| `--color-success-soft` | `#DCFCE7` | Success chip background (light) |
| `--color-success-dark` | `#16A34A` | Success on dark surfaces |
| `--color-warning` | `#F59E0B` | Unsaved changes, slow connection |
| `--color-warning-soft` | `#FEF3C7` | Warning chip background (light) |
| `--color-warning-dark` | `#D97706` | Warning on dark surfaces |
| `--color-error` | `#EF4444` | Block error, upload failed |
| `--color-error-soft` | `#FEE2E2` | Error chip background (light) |
| `--color-error-dark` | `#DC2626` | Error on dark surfaces |
| `--color-info` | `#3B82F6` | Tip, hint, system message |
| `--color-info-soft` | `#DBEAFE` | Info chip background (light) |
| `--color-info-dark` | `#2563EB` | Info on dark surfaces |

### 3.7 Theme Surfaces

#### Dark Theme (Default — IDE feel)

```css
--color-dark-bg:       #0A0E1A;  /* App background (deepest) */
--color-dark-surface:  #111827;  /* Panels, sidebars */
--color-dark-elevated: #1F2937;  /* Modals, dropdowns, cards */
--color-dark-border:   #334155;  /* Dividers, input borders */
--color-dark-hover:    #2D3748;  /* Hover overlay for interactive surfaces */
```

#### Light Theme

```css
--color-light-bg:       #FFFFFF;  /* App background */
--color-light-surface:  #F8FAFC;  /* Panels, sidebars */
--color-light-elevated: #F1F5F9;  /* Cards, hovered tiles */
--color-light-border:   #E2E8F0;  /* Dividers, input borders */
--color-light-hover:    #E2E8F0;  /* Hover state on tiles */
```

#### Text Color Pairings

| Surface | Primary text | Secondary text | Disabled |
|---|---|---|---|
| `--color-dark-bg` | `#F8FAFC` | `#94A3B8` | `#475569` |
| `--color-light-bg` | `#0F172A` | `#475569` | `#94A3B8` |

### 3.8 Contrast Verification

All foreground/background token pairs listed in section 3.7 meet **WCAG AA** at minimum (4.5:1 for body text). Primary CTA (`#EAB308` on `#0A0E1A`) achieves ~11:1 — AAA grade. Always re-verify when introducing new pairings.

---

## 4. Typography System

### 4.1 Font Families

```css
--font-primary:   "Roboto", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-secondary: "Open Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono:      "JetBrains Mono", "Fira Code", "Roboto Mono", ui-monospace, monospace;
```

- **Roboto (primary)** — UI surfaces, navigation, buttons, headings. Geometric clarity matches the futuristic personality.
- **Open Sans (secondary)** — long-form reading: lesson content, documentation, tutorials. Higher x-height and more rounded shapes feel friendlier for younger readers.
- **JetBrains Mono (monospace)** — generated code preview, terminal output, sensor values, block parameter inputs. Ligatures enabled.

### 4.2 Font Weights

| Token | Weight | Roboto use | Open Sans use |
|---|---|---|---|
| `--font-weight-light` | 300 | Disclaimers | Quiet body in lesson sidebars |
| `--font-weight-regular` | 400 | Body, labels | Lesson body, paragraphs |
| `--font-weight-medium` | 500 | Buttons, tabs, table headers | Sub-headings in lessons |
| `--font-weight-semibold` | 600 | Section titles | Lesson section titles |
| `--font-weight-bold` | 700 | Hero headlines, key CTAs | Lesson chapter titles |
| `--font-weight-black` | 900 | Marketing display only | — |

### 4.3 Type Scale

A modular scale based on `1rem = 16px`, ratio ~1.25 (major third). Mobile uses a slightly compressed scale.

| Token | Size (desktop) | Line height | Weight | Use |
|---|---|---|---|---|
| `--text-display-2xl` | 72px / 4.5rem | 1.05 | 700 | Marketing hero |
| `--text-display-xl`  | 60px / 3.75rem | 1.1  | 700 | Section hero |
| `--text-display-lg`  | 48px / 3rem    | 1.15 | 700 | Page hero (app) |
| `--text-heading-xl`  | 36px / 2.25rem | 1.2  | 700 | Page title |
| `--text-heading-lg`  | 30px / 1.875rem| 1.25 | 600 | Section title |
| `--text-heading-md`  | 24px / 1.5rem  | 1.3  | 600 | Card title |
| `--text-heading-sm`  | 20px / 1.25rem | 1.35 | 600 | Sub-section |
| `--text-body-lg`     | 18px / 1.125rem| 1.6  | 400 | Lesson body, intros |
| `--text-body-md`     | 16px / 1rem    | 1.55 | 400 | **Default body** |
| `--text-body-sm`     | 14px / 0.875rem| 1.5  | 400 | Secondary text, captions |
| `--text-body-xs`     | 12px / 0.75rem | 1.45 | 500 | Labels, badges, meta |
| `--text-code-md`     | 14px / 0.875rem| 1.6  | 400 | Code preview |
| `--text-code-sm`     | 13px / 0.8125rem| 1.55| 400 | Inline code, parameters |

### 4.4 Letter Spacing

```css
--tracking-tight:   -0.02em;  /* Display headlines */
--tracking-snug:    -0.01em;  /* Headings */
--tracking-normal:  0;        /* Body */
--tracking-wide:    0.025em;  /* Labels, buttons */
--tracking-wider:   0.08em;   /* UPPERCASE chips, badges */
```

### 4.5 Mobile Scale Adjustments

On viewports below `--breakpoint-md` (768px), display sizes scale down ~80%:

- `--text-display-2xl` → 48px
- `--text-display-xl` → 40px
- `--text-display-lg` → 32px
- `--text-heading-xl` → 28px

Body sizes remain unchanged for legibility.

---

## 5. Spacing & Layout

### 5.1 Base Unit

The system uses a **4px base unit** with a non-linear scale tuned for IDE-density UIs.

```css
--space-0:   0;
--space-1:   4px;   /* Tight inner padding, icon-to-text */
--space-2:   8px;   /* Compact gaps, chip padding */
--space-3:   12px;  /* Default tight gap */
--space-4:   16px;  /* Default gap, card padding */
--space-5:   20px;
--space-6:   24px;  /* Section gap */
--space-8:   32px;  /* Group gap */
--space-10:  40px;
--space-12:  48px;  /* Page section gap */
--space-16:  64px;  /* Large page section */
--space-20:  80px;
--space-24:  96px;  /* Hero spacing */
--space-32:  128px; /* Major marketing section */
```

### 5.2 Container Widths

```css
--container-sm:  640px;   /* Lesson reader (centered) */
--container-md:  768px;   /* Forms, settings */
--container-lg:  1024px;  /* Marketing content */
--container-xl:  1280px;  /* Default marketing max-width */
--container-2xl: 1536px;  /* Wide marketing hero */
--container-full: 100%;   /* IDE workspace (always full-bleed) */
```

The **workspace/IDE always uses `--container-full`** — drag-and-drop coding deserves every pixel.

### 5.3 Grid System

- **Marketing pages:** 12-column grid, `--space-6` (24px) gutter on desktop, 4-column with `--space-4` (16px) on mobile.
- **App pages:** flex-based panels with resizable handles. No rigid grid — IDE layouts are user-driven.
- **Card grids:** CSS Grid with `auto-fill, minmax(280px, 1fr)`, gap `--space-6`.

### 5.4 Breakpoints

```css
--breakpoint-xs:  480px;   /* Large phones */
--breakpoint-sm:  640px;   /* Small tablets */
--breakpoint-md:  768px;   /* Tablets */
--breakpoint-lg:  1024px;  /* Small laptops — IDE becomes usable */
--breakpoint-xl:  1280px;  /* Standard desktop */
--breakpoint-2xl: 1536px;  /* Wide desktop */
```

**Note:** The drag-and-drop IDE is **optimized for `lg` and above**. On smaller screens, show a read-only project preview + a "Best on tablet or laptop" hint.

### 5.5 Border Radius

```css
--radius-none: 0;
--radius-xs:   2px;    /* Code tokens, micro-tags */
--radius-sm:   4px;    /* Inputs, small chips */
--radius-md:   6px;    /* Buttons, dropdowns */
--radius-lg:   8px;    /* Cards, panels */
--radius-xl:   12px;   /* Modals, large surfaces */
--radius-2xl:  16px;   /* Hero cards, feature cards */
--radius-3xl:  24px;   /* Marketing visuals */
--radius-block: 10px;  /* Visual programming blocks (signature radius) */
--radius-full: 9999px; /* Pills, avatars */
```

### 5.6 Shadows & Elevation

Elevation in dark mode uses **glow** rather than drop shadow. Light mode uses traditional shadows.

```css
/* Light theme — physical shadows */
--shadow-xs:   0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-sm:   0 1px 3px rgba(15, 23, 42, 0.08),  0 1px 2px rgba(15, 23, 42, 0.04);
--shadow-md:   0 4px 6px rgba(15, 23, 42, 0.07),  0 2px 4px rgba(15, 23, 42, 0.04);
--shadow-lg:   0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.04);
--shadow-xl:   0 20px 25px rgba(15, 23, 42, 0.10), 0 10px 10px rgba(15, 23, 42, 0.04);
--shadow-2xl:  0 25px 50px rgba(15, 23, 42, 0.16);

/* Dark theme — glow accents */
--shadow-dark-sm:  0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-dark-md:  0 4px 12px rgba(0, 0, 0, 0.5);
--shadow-dark-lg:  0 10px 30px rgba(0, 0, 0, 0.6);

/* Brand glow effects (use sparingly — only for focus, success, hero moments) */
--shadow-glow-primary:   0 0 24px rgba(234, 179, 8, 0.35),  0 0 1px rgba(234, 179, 8, 0.8);
--shadow-glow-secondary: 0 0 24px rgba(6, 182, 212, 0.35),  0 0 1px rgba(6, 182, 212, 0.8);
--shadow-glow-accent:    0 0 24px rgba(139, 92, 246, 0.35), 0 0 1px rgba(139, 92, 246, 0.8);
--shadow-glow-success:   0 0 16px rgba(34, 197, 94, 0.35);
--shadow-glow-error:     0 0 16px rgba(239, 68, 68, 0.35);
```

### 5.7 Z-Index Scale

```css
--z-base:        0;
--z-raised:      10;
--z-dropdown:    1000;
--z-sticky:      1020;
--z-fixed:       1030;
--z-modal-overlay: 1040;
--z-modal:       1050;
--z-popover:     1060;
--z-toast:       1070;
--z-tooltip:     1080;
```

---

## 6. UI Components

Component specs live in Storybook. This is the canonical inventory and contract.

### 6.1 Foundational

| Component | Key props / variants | Notes |
|---|---|---|
| **Button** | `variant`: primary, secondary, accent, ghost, danger · `size`: sm, md, lg, xl · `loading` · `iconLeft` · `iconRight` · `fullWidth` | Primary = yellow. Default focus ring uses `--shadow-glow-primary`. Min height 36px (sm) / 44px (md, touch target). |
| **IconButton** | `variant`, `size`, `aria-label` (required) | Square. 44×44 minimum for touch. |
| **Link** | `variant`: inline, standalone · `external` | Cyan (`--color-secondary-500`), underline on hover. |
| **Input** | `type`, `error`, `hint`, `iconLeft`, `iconRight`, `clearable` | 44px height. Glow border on focus. |
| **Textarea** | `autoResize`, `maxLength`, `showCount` | |
| **Select / Combobox** | `multi`, `searchable`, `creatable` | Built on a headless primitive (Radix or Ark). |
| **Checkbox** | `indeterminate`, `size` | |
| **Radio** | grouped | |
| **Switch** | `size`, `label` | For settings, theme toggle. |
| **Slider** | `min`, `max`, `step`, `marks` | Used for sensor thresholds. |
| **Tag / Chip** | `variant`: neutral, info, success, warning, error, primary · `removable` | |
| **Badge** | `dot`, `count` | For unread, notifications. |
| **Avatar** | `size`, `src`, `fallback` (initials) | |

### 6.2 Navigation

- **Top Nav** — logo (left), main links (center), profile/notifications (right). Sticky.
- **Sidebar (App)** — collapsible. Houses block categories, file tree, project list.
- **Tabs** — for switching between Blocks ↔ Generated Code ↔ Serial Monitor.
- **Breadcrumbs** — only on Lessons and Docs.
- **Command Palette (⌘K)** — fuzzy search projects, lessons, blocks, settings.

### 6.3 Feedback

- **Toast / Snackbar** — variants: success, error, warning, info. Auto-dismiss 4s; sticky on error.
- **Alert / Banner** — inline notifications inside panels.
- **Tooltip** — short hover hints. 200ms delay.
- **Popover** — richer hover/click content.
- **Modal / Dialog** — confirms, multi-step flows. Trap focus.
- **Drawer** — slide-in panels (right) for project settings, board configuration.
- **EmptyState** — illustrated, with CTA. (See Section 10 for copy guidance.)
- **Skeleton** — pulse animation for loading lists, cards.
- **Spinner / Progress** — linear and circular.
- **Stepper** — for onboarding and multi-step wizards.

### 6.4 Data Display

- **Card** — `variant`: default, interactive, elevated · `padding`: sm, md, lg.
- **Table** — sortable, paginated, sticky header. Used for admin/teacher dashboards.
- **List** — virtualized for long file trees and lesson catalogs.
- **Stat / Metric** — for student progress dashboards.
- **CodeBlock** — syntax-highlighted preview of generated Arduino C++.

### 6.5 IDE-Specific (Signature Components)

These are unique to Schoolasium and define the brand:

- **Block** — the draggable visual programming unit. Rounded `--radius-block`. Color-coded by category. Has notched edges that visually "click" into adjacent blocks.
- **BlockCategory Pill** — left-rail category (Motion, Sensors, Logic, Variables…). Each owns a hue derived from the palette.
- **Workspace Canvas** — infinite, pannable, zoomable. Subtle dot grid background using `--color-dark-border` at 30% opacity.
- **Connection Wire** — bezier SVG path between block ports. Animated dash when data is flowing.
- **BoardPort** — visual representation of an Arduino pin. Color matches the wired block.
- **SerialMonitor** — terminal-style panel with `--font-mono`.
- **SensorReadout** — live value tile with animated number transitions.
- **PaletteSearch** — top of block palette, fuzzy search blocks.

### 6.6 Marketing

- **Hero** — large display heading, sub-headline, primary + secondary CTA, animated workspace preview.
- **FeatureGrid** — 3-column on desktop, icon + title + description.
- **Testimonial** — quote, avatar, name, role (teacher/student/parent).
- **PricingCard** — tier name, price, feature list, CTA.
- **FAQ Accordion** — collapsible items with smooth height transitions.
- **CTASection** — large banner with primary CTA.
- **Footer** — links, social, language picker, theme toggle.

---

## 7. Icons & Illustrations

### 7.1 Icon System

- **Library:** [Lucide](https://lucide.dev) — feather-style, technical-but-friendly, matches the personality.
- **Default size:** 20px (inline with body), 16px (dense UI), 24px (buttons), 32px+ (feature cards).
- **Stroke width:** 1.75px default (Lucide's `strokeWidth={1.75}`). Slightly thicker than default for better readability for younger users.
- **Color:** uses `currentColor` so icons inherit text color naturally.

**Custom icons** (block category icons, board/sensor representations) follow the same stroke/style language and live in `/icons/custom/` as SVG components.

### 7.2 Illustration Style

Two-layer system:

1. **Functional illustrations** — empty states, onboarding screens. Flat, geometric, palette-locked. Friendly but not childish. Always include a small "robot character" or "circuit motif" to reinforce the niche.
2. **Decorative motifs** — circuit traces, dotted grids, isometric components used as backdrop patterns. Subtle, low-contrast, never compete with foreground.

**Don't use:** 3D Memphis-style, generic SaaS illustration packs, or anything that screams "stock graphics."

### 7.3 Imagery

- **Product screenshots** — always shown in dark theme (the brand's default mode).
- **Student/teacher photography** — natural light, real classrooms preferred over stock. Avoid posed corporate shots.

---

## 8. Motion & Animation

### 8.1 Motion Philosophy

**Smooth, energetic, premium.** Animations should make the platform feel alive — like Framer — but never slow the user down. Every animation has a purpose: feedback, continuity, or delight.

### 8.2 Easing

```css
--ease-linear:    cubic-bezier(0, 0, 1, 1);
--ease-out:       cubic-bezier(0.16, 1, 0.3, 1);   /* Default — feels snappy then settles */
--ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);  /* For symmetric motion */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful overshoot — blocks snapping in */
--ease-decel:     cubic-bezier(0, 0, 0.2, 1);
```

### 8.3 Durations

```css
--duration-instant: 80ms;    /* Tooltips, color shifts */
--duration-fast:    150ms;   /* Hover, focus rings, button states */
--duration-base:    250ms;   /* Default UI motion — dropdowns, switches */
--duration-slow:    400ms;   /* Modals, drawers, panel transitions */
--duration-slower:  600ms;   /* Hero reveals, page enters */
--duration-deliberate: 900ms;/* Onboarding stagger, "ta-da" moments */
```

### 8.4 Patterns

- **Hover:** `transform: translateY(-1px)` + shadow increase, `--duration-fast` `--ease-out`.
- **Press:** `transform: scale(0.98)`, `--duration-instant`.
- **Focus:** glow ring fade-in over `--duration-fast`.
- **Modal open:** opacity 0→1 + scale 0.96→1 over `--duration-base` `--ease-out`.
- **Drawer:** slide from edge over `--duration-slow` `--ease-out`.
- **Block snap:** spring scale 1.05→1 over `--duration-base` `--ease-spring` — the signature delight moment.
- **Code generation reveal:** typing effect, ~30ms per character, capped at 1.5s total.
- **Toast enter/exit:** slide + fade `--duration-base`.
- **Page transitions:** crossfade `--duration-slow` for marketing; instant for in-app for productivity.
- **Skeleton pulse:** 1.5s ease-in-out infinite.
- **Loading spinner:** 0.8s linear infinite.

### 8.5 Motion Accessibility

Honor `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Replace springs and overshoots with simple opacity changes.
- Disable auto-playing decorative motion (background gradients, circuit traces).
- Keep functional state changes (focus rings, error shake → just color change).

---

## 9. Accessibility Standards

### 9.1 Compliance Target

**WCAG 2.2 Level AA**, with AAA targeted for headlines and primary CTAs.

### 9.2 Color & Contrast

- Body text: ≥ 4.5:1
- Large text (≥18pt or ≥14pt bold): ≥ 3:1
- UI components and graphical objects: ≥ 3:1
- **Never communicate state with color alone** — pair with icon, label, or pattern.

### 9.3 Keyboard Navigation

- Every interactive element reachable via Tab.
- Visible focus ring (`--shadow-glow-primary` on a 2px outline). Never `outline: none` without replacement.
- Logical tab order matches visual order.
- Modals: trap focus, return focus to trigger on close.
- IDE: full keyboard shortcuts (⌘S save, ⌘Z undo, ⌘D duplicate block, ⌘K command palette, etc.). Show shortcuts in tooltips.

### 9.4 Screen Reader Support

- Semantic HTML first (`<button>`, `<nav>`, `<main>`, `<dialog>`).
- ARIA only where semantic HTML doesn't suffice (e.g., drag-and-drop blocks announce as "Block: Move Forward, in Motion category, position 2 of 5").
- Live regions (`aria-live="polite"`) for serial monitor output, save confirmations.
- All icons-as-buttons have `aria-label`.
- Images have `alt`; decorative images use `alt=""`.

### 9.5 Touch & Motor

- Minimum touch target: **44×44 px** (iOS) / 48×48 px preferred.
- Block dragging: support both mouse drag and keyboard "Pick up → Arrow keys → Drop."
- No hover-only affordances — show by default or expose via click on touch devices.

### 9.6 Cognitive Load

- Plain language (target reading age ~10).
- Consistent component behavior across the platform.
- Confirm destructive actions (delete project, reset workspace).
- Save automatically; surface "Saved" microcopy.

---

## 10. Tone of Voice & Content

### 10.1 Writing Principles

The platform speaks like a **friendly senior student** — smart, encouraging, never condescending. Short sentences. Active voice. Concrete verbs.

**Always:**

- Friendly, encouraging, simple
- Modern, creative, energetic
- Beginner-respectful (never "for dummies")

**Never:**

- Corporate, robotic, jargon-heavy
- Babyish or talking-down
- Sales-y or hyper-promotional

Voice ladder by audience:

- **To kids:** *"Drag a block. Watch it work. You just programmed a robot."*
- **To teachers:** *"Track every student's progress in real time, across classrooms."*
- **To schools/institutes:** *"A standards-aligned robotics curriculum that scales with your program."*

### 10.2 CTAs

Use action verbs that promise creation, not consumption.

**Approved patterns:**

- Start Building
- Create Your First Project
- Open the Coding Lab
- Build with Blocks
- Launch Workspace
- Start Creating
- Explore Robotics
- Try Visual Coding
- Build Something Smart
- Begin Your Coding Journey

**Avoid:** Submit · Click here · Learn more · Get started today!

### 10.3 Error Messages

Tone: calm, supportive, specific, actionable.

| Bad | Good |
|---|---|
| "Error 5031: Compilation failed." | "Some blocks aren't connected yet. Check the highlighted block." |
| "Invalid input." | "That sensor expects a number between 0 and 1023." |
| "Save failed." | "We couldn't save right now. Your work is held locally — try again in a moment." |

**Pattern:** What happened (gentle) → why (plain) → what to do (clear).

### 10.4 Empty States

Empty space should invite exploration.

- *"Start dragging blocks to build your first project."*
- *"Your workspace is empty. Let's create something awesome."*
- *"No projects yet — your robotics journey starts here."*
- *"Connect blocks to bring your ideas to life."*

Each empty state includes: one short headline · one short description · one primary CTA · a friendly illustration.

### 10.5 Microcopy

Short. Positive. Active.

- "Saved successfully"
- "Project synced"
- "Block connected"
- "Code generated"
- "Sensor added"
- "Workspace restored"
- "Welcome back, ready to build?"
- "Nice — that worked first try."

### 10.6 Naming Conventions

- **Workspace** (not "editor" or "playground")
- **Project** (not "file" or "sketch")
- **Block** (not "node" or "module")
- **Board** (not "device" — for Arduino/microcontroller)
- **Lesson** (not "course module")
- **Lab** (premium / advanced area)

---

## 11. Design Tokens (CSS Variables)

Drop the following into a single `tokens.css` and import it as the first stylesheet. All values above are codified here.

```css
:root {
  /* --- Brand: Primary (Yellow) --- */
  --color-primary-50:  #FEFCE8;
  --color-primary-100: #FEF9C3;
  --color-primary-200: #FEF08A;
  --color-primary-300: #FDE047;
  --color-primary-400: #FACC15;
  --color-primary-500: #EAB308;
  --color-primary-600: #CA8A04;
  --color-primary-700: #A16207;
  --color-primary-800: #854D0E;
  --color-primary-900: #713F12;

  /* --- Brand: Secondary (Cyan) --- */
  --color-secondary-50:  #ECFEFF;
  --color-secondary-100: #CFFAFE;
  --color-secondary-300: #67E8F9;
  --color-secondary-400: #22D3EE;
  --color-secondary-500: #06B6D4;
  --color-secondary-600: #0891B2;
  --color-secondary-700: #0E7490;
  --color-secondary-900: #164E63;

  /* --- Brand: Accent (Violet) --- */
  --color-accent-300: #C4B5FD;
  --color-accent-400: #A78BFA;
  --color-accent-500: #8B5CF6;
  --color-accent-600: #7C3AED;
  --color-accent-700: #6D28D9;

  /* --- Neutrals (Slate) --- */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1F2937;
  --color-neutral-900: #111827;
  --color-neutral-950: #0A0E1A;

  /* --- Dark Theme Surfaces --- */
  --color-dark-bg:       #0A0E1A;
  --color-dark-surface:  #111827;
  --color-dark-elevated: #1F2937;
  --color-dark-border:   #334155;
  --color-dark-hover:    #2D3748;

  /* --- Light Theme Surfaces --- */
  --color-light-bg:       #FFFFFF;
  --color-light-surface:  #F8FAFC;
  --color-light-elevated: #F1F5F9;
  --color-light-border:   #E2E8F0;
  --color-light-hover:    #E2E8F0;

  /* --- Semantic Colors --- */
  --color-success:      #22C55E;
  --color-success-soft: #DCFCE7;
  --color-success-dark: #16A34A;
  --color-warning:      #F59E0B;
  --color-warning-soft: #FEF3C7;
  --color-warning-dark: #D97706;
  --color-error:        #EF4444;
  --color-error-soft:   #FEE2E2;
  --color-error-dark:   #DC2626;
  --color-info:         #3B82F6;
  --color-info-soft:    #DBEAFE;
  --color-info-dark:    #2563EB;

  /* --- Typography --- */
  --font-primary:   "Roboto", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-secondary: "Open Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono:      "JetBrains Mono", "Fira Code", "Roboto Mono", ui-monospace, monospace;

  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;
  --font-weight-black:    900;

  --text-display-2xl: 4.5rem;    /* 72px */
  --text-display-xl:  3.75rem;   /* 60px */
  --text-display-lg:  3rem;      /* 48px */
  --text-heading-xl:  2.25rem;   /* 36px */
  --text-heading-lg:  1.875rem;  /* 30px */
  --text-heading-md:  1.5rem;    /* 24px */
  --text-heading-sm:  1.25rem;   /* 20px */
  --text-body-lg:     1.125rem;  /* 18px */
  --text-body-md:     1rem;      /* 16px */
  --text-body-sm:     0.875rem;  /* 14px */
  --text-body-xs:     0.75rem;   /* 12px */
  --text-code-md:     0.875rem;
  --text-code-sm:     0.8125rem;

  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.6;

  --tracking-tight:  -0.02em;
  --tracking-snug:   -0.01em;
  --tracking-normal: 0;
  --tracking-wide:   0.025em;
  --tracking-wider:  0.08em;

  /* --- Spacing --- */
  --space-0:  0;
  --space-1:  0.25rem;   /* 4px  */
  --space-2:  0.5rem;    /* 8px  */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* --- Containers --- */
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1280px;
  --container-2xl:  1536px;
  --container-full: 100%;

  /* --- Breakpoints (use in media queries) --- */
  --breakpoint-xs:  480px;
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-2xl: 1536px;

  /* --- Radius --- */
  --radius-none:  0;
  --radius-xs:    2px;
  --radius-sm:    4px;
  --radius-md:    6px;
  --radius-lg:    8px;
  --radius-xl:    12px;
  --radius-2xl:   16px;
  --radius-3xl:   24px;
  --radius-block: 10px;
  --radius-full:  9999px;

  /* --- Shadows (light theme) --- */
  --shadow-xs:  0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-sm:  0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-md:  0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.04);
  --shadow-lg:  0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.04);
  --shadow-xl:  0 20px 25px rgba(15, 23, 42, 0.10), 0 10px 10px rgba(15, 23, 42, 0.04);
  --shadow-2xl: 0 25px 50px rgba(15, 23, 42, 0.16);

  /* --- Shadows (dark theme) --- */
  --shadow-dark-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-dark-md: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-dark-lg: 0 10px 30px rgba(0, 0, 0, 0.6);

  /* --- Glow Effects --- */
  --shadow-glow-primary:   0 0 24px rgba(234, 179, 8, 0.35), 0 0 1px rgba(234, 179, 8, 0.8);
  --shadow-glow-secondary: 0 0 24px rgba(6, 182, 212, 0.35), 0 0 1px rgba(6, 182, 212, 0.8);
  --shadow-glow-accent:    0 0 24px rgba(139, 92, 246, 0.35), 0 0 1px rgba(139, 92, 246, 0.8);
  --shadow-glow-success:   0 0 16px rgba(34, 197, 94, 0.35);
  --shadow-glow-error:     0 0 16px rgba(239, 68, 68, 0.35);

  /* --- Z-Index --- */
  --z-base:          0;
  --z-raised:        10;
  --z-dropdown:      1000;
  --z-sticky:        1020;
  --z-fixed:         1030;
  --z-modal-overlay: 1040;
  --z-modal:         1050;
  --z-popover:       1060;
  --z-toast:         1070;
  --z-tooltip:       1080;

  /* --- Animation Durations --- */
  --duration-instant:    80ms;
  --duration-fast:       150ms;
  --duration-base:       250ms;
  --duration-slow:       400ms;
  --duration-slower:     600ms;
  --duration-deliberate: 900ms;

  /* --- Easing --- */
  --ease-linear:  cubic-bezier(0, 0, 1, 1);
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-decel:   cubic-bezier(0, 0, 0.2, 1);
}

/* --- Theme: Dark (default) --- */
:root,
[data-theme="dark"] {
  --bg-app:       var(--color-dark-bg);
  --bg-surface:   var(--color-dark-surface);
  --bg-elevated: var(--color-dark-elevated);
  --bg-hover:     var(--color-dark-hover);
  --border-default: var(--color-dark-border);

  --text-primary:   #F8FAFC;
  --text-secondary: #94A3B8;
  --text-disabled:  #475569;

  --shadow-default: var(--shadow-dark-md);
}

/* --- Theme: Light --- */
[data-theme="light"] {
  --bg-app:       var(--color-light-bg);
  --bg-surface:   var(--color-light-surface);
  --bg-elevated: var(--color-light-elevated);
  --bg-hover:     var(--color-light-hover);
  --border-default: var(--color-light-border);

  --text-primary:   #0F172A;
  --text-secondary: #475569;
  --text-disabled:  #94A3B8;

  --shadow-default: var(--shadow-md);
}

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 12. Documentation Style

The documentation serves two readers — developers integrating the system, and stakeholders (teachers, partners) evaluating it. Two complementary tracks:

### 12.1 Developer Documentation

**Hosted in:** Storybook (component playground) + a dedicated docs site (Nextra, Docusaurus, or VitePress).

**Each component page contains:**

1. **Overview** — what it is, when to use, when not to use.
2. **Anatomy** — annotated screenshot of every part.
3. **Props table** — name, type, default, description.
4. **Variants** — visual gallery with code snippets.
5. **Accessibility notes** — keyboard map, ARIA roles, screen reader expectations.
6. **Do / Don't** — visual examples.
7. **Code examples** — copy-paste ready, framework-specific (React first, vanilla second).
8. **Changelog** — what changed and when.

**Code style:** TypeScript everywhere. Props use discriminated unions for variants. Storybook stories use Controls and a11y addon.

### 12.2 Enterprise / Stakeholder Documentation

**Hosted in:** a polished, public-facing design portal (separate from Storybook).

**Sections:**

1. **Brand Foundation** — story, mission, audience, principles.
2. **Visual Identity** — logo, colors, typography (with samples, not raw values).
3. **Sample Screens** — annotated walkthroughs of marketing pages, workspace, lessons.
4. **Accessibility Statement** — WCAG conformance, testing process, contact for issues.
5. **Governance** — who owns the system, how to request changes, release cadence.
6. **Partner Guidelines** — how schools and institutes co-brand without breaking the system.

### 12.3 Versioning

- Semantic Versioning (`MAJOR.MINOR.PATCH`).
- Breaking token changes → MAJOR.
- New tokens / components → MINOR.
- Bug fixes / docs → PATCH.
- Deprecation cycle: announce in MINOR, remove in next MAJOR. Always provide a migration note.

### 12.4 Contribution Process

- Proposals open via GitHub Discussions or internal RFC template.
- Design review → engineering review → a11y review → ship.
- Each merged change updates Storybook, docs site, and CHANGELOG.

---

## 13. Future Expansion

The system is built to scale beyond a single product. Plan for these directions:

### 13.1 Multi-Brand Support

If Schoolasium spins out sub-brands (e.g., *Schoolasium Labs* for advanced learners, *Schoolasium for Schools* for institutional), the token architecture supports it via theme layers:

```css
[data-brand="labs"] {
  --color-primary-500: /* labs-specific hue */;
  /* other overrides */
}
```

Keep semantic tokens stable across brands; only override raw color and typography primitives.

### 13.2 Product Line Expansion

Anticipated additional surfaces — each inherits this system:

- **Schoolasium Mobile** — companion app for project preview, lesson reading, progress tracking. Reuses tokens, swaps IDE-specific components.
- **Schoolasium Classroom** — teacher dashboard. Heavier on `Table`, `Stat`, `EmptyState`. Same tokens.
- **Schoolasium Marketplace** — community-shared projects and lesson packs. New `ProjectCard` variant, otherwise unchanged.
- **Schoolasium Print** — printable worksheets and lab manuals. Print-mode stylesheet uses light theme tokens.

### 13.3 Locale & Internationalization

- All text externalized to translation files (English baseline).
- Typography stack already includes safe fallbacks for non-Latin scripts; verify with Devanagari, CJK, and Arabic before launching those locales.
- RTL support: use logical properties (`margin-inline-start`, `padding-block`) — already standard in this system.

### 13.4 Theming Beyond Light/Dark

Anticipated themes:

- **High-contrast** — for accessibility.
- **Classroom Projector** — high-saturation, large type, optimized for being seen from the back of a room.
- **Focus Mode** — desaturated grays, primary color reserved for the active block only.

Each lives as `[data-theme="..."]` and overrides only the surface/text tokens.

### 13.5 Token Distribution

Move tokens to a single source of truth using **Style Dictionary** or **Tokens Studio**. Generate outputs for:

- CSS variables (web)
- JSON (design tools — Figma Tokens)
- Swift / Kotlin (future native apps)
- Tailwind config (if Tailwind is adopted)

This guarantees parity between design and code as the team grows.

---

## Appendix A — Quick Reference Cheatsheet

| I want to… | Use |
|---|---|
| Make something the user must do | `<Button variant="primary">` — yellow |
| Add a link or secondary action | `<Button variant="secondary">` or `<Link>` — cyan |
| Highlight a creative / premium moment | accent violet + `--shadow-glow-accent` |
| Show success | `--color-success` + check icon |
| Show an empty workspace | `<EmptyState>` with a CTA from §10.2 |
| Snap a block into place | `--ease-spring` over `--duration-base` |
| Add depth in dark theme | `--shadow-dark-md` or a glow, never a black drop shadow |
| Add depth in light theme | `--shadow-md` |
| Spacing inside a card | `--space-4` (16px) on small, `--space-6` (24px) on large |
| Heading font | Roboto, `--font-weight-semibold` or `-bold` |
| Long-form reading font | Open Sans, `--font-weight-regular` |
| Code preview font | JetBrains Mono |

---

## Appendix B — Don't List

Quick reference of things that violate the system:

- ❌ Inter, Space Grotesk, Arial in product UI
- ❌ Purple-on-white SaaS gradients
- ❌ Bright cyan/magenta on dark mode (it hurts after 10 minutes in the workspace)
- ❌ Drop shadows on dark mode (use glow)
- ❌ Hard-coded hex values in components (always reference tokens)
- ❌ "Submit" or "Click here" buttons
- ❌ Childish illustrations (cartoon-y, primary-color overload)
- ❌ Color as the only signal for state
- ❌ Hover-only affordances
- ❌ Auto-playing motion without a way to pause

---

*This is a living document. Propose changes via the Schoolasium Design System repository.*
