"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Zap, Code2, Users, Palette, Package,
  ChevronDown, ChevronRight, Copy, Check,
  Download, Bot, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "getting-started",
    icon: Zap,
    title: "Getting Started",
    color: "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10",
    topics: [
      {
        title: "What is the Schoolasium Design System?",
        content: `The Schoolasium Design System (SDS) is the single source of truth for all design and engineering at Schoolasium. It covers:

**Design Tokens** — 120+ CSS variables for color, typography, spacing, radius, shadows, and motion
**Component Library** — 40+ production-ready React components with live previews and full docs
**Resource Hub** — Brand assets, fonts, token files, and code templates ready to download
**AI Guidelines** — Prompt templates and rules for on-brand AI-assisted development
**Employee Portal** — Private workspace for internal teams with role-based access control`,
      },
      {
        title: "How to access resources",
        content: `**Public resources** (logos, fonts, tokens, docs) are available to everyone — no sign-in required.

**Employee-only resources** (Figma kit, icon pack, Next.js starter) require an employee account:
1. Contact your admin — employees cannot self-register
2. Sign in at /employee-portal with your provided credentials
3. Change your temporary password on first login`,
      },
      {
        title: "Setting up the database (first time)",
        content: `After deploying or running locally, seed the database with the initial employee accounts:

\`\`\`bash
# 1. Copy the env template
cp .env.local.example .env.local

# 2. Set your MongoDB URI and JWT secret
MONGODB_URI=mongodb://127.0.0.1:27017/schoolasium-ds
JWT_SECRET=your-32-char-secret-here

# 3. Start the dev server
npm run dev

# 4. Seed the database (in a new terminal)
curl -X POST http://localhost:3000/api/admin/seed \\
  -H "Content-Type: application/json" \\
  -d "{}"
\`\`\`

This creates 5 seed accounts. The response includes login credentials.`,
      },
      {
        title: "How permissions work",
        content: `Four roles — from most to least privileged:

| Role | Permissions |
|---|---|
| **super_admin** | All — create/delete accounts, manage all resources |
| **admin** | Create/disable accounts, view activity logs, manage resources |
| **employee** | Download all resources (public + internal), access portal |
| **viewer** | Download public resources only |

Roles are assigned by admins and cannot be self-changed.`,
      },
    ],
  },
  {
    id: "developers",
    icon: Code2,
    title: "Developer Guide",
    color: "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
    topics: [
      {
        title: "Setting up design tokens",
        content: `**CSS Variables (recommended)** — download tokens.css and import first:

\`\`\`css
/* globals.css */
@import "./tokens.css";

/* Then use anywhere */
.button { background: var(--color-primary-500); }
\`\`\`

**Tailwind v4** — download tailwind.config.ts and use as preset:

\`\`\`ts
import sdConfig from "./tailwind.config"
export default { presets: [sdConfig] } satisfies Config
\`\`\`

**SCSS** — import _tokens.scss:

\`\`\`scss
@use "./tokens" as *;
.button { background: $color-primary-500; }
\`\`\``,
      },
      {
        title: "Using components",
        content: `Copy component code from the Components page. Minimum setup:

\`\`\`tsx
// 1. Tokens must be loaded
import "@/styles/tokens.css"

// 2. Copy-paste from Components page
export function Button({ variant = "primary", children }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
      variant === "primary" && "bg-[var(--color-primary-500)] text-black hover:bg-[var(--color-primary-400)]",
    )}>
      {children}
    </button>
  )
}
\`\`\`

Every component has: TypeScript props · Live preview · a11y notes · Copy-ready code.`,
      },
      {
        title: "Theme setup",
        content: `Dark-first. Add data-theme="light" to <html> for light mode.

\`\`\`tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

ThemeProvider reads localStorage["sds-theme"] and sets data-theme on <html>. All CSS variables update automatically.`,
      },
      {
        title: "Authentication API",
        content: `All API routes use JWT in an httpOnly cookie.

\`\`\`bash
# Sign in
POST /api/auth/signin
Body: { "email": "...", "password": "..." }
Response: { "user": { id, email, name, role, department } }

# Get current user
GET /api/auth/me
Response: { "user": { ... } | null }

# Sign out
POST /api/auth/signout
Response: { "ok": true }

# Admin: list employees
GET /api/admin/employees?search=&role=&dept=&status=&page=1&limit=50

# Admin: create employee
POST /api/admin/employees
Body: { name, email, role, department, tempPassword }

# Log an event
POST /api/activity
Body: { type, detail, resourceId? }
\`\`\``,
      },
    ],
  },
  {
    id: "employees",
    icon: Users,
    title: "Employee Guide",
    color: "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10",
    topics: [
      {
        title: "Requesting new components",
        content: `1. Open a GitHub Discussion or internal RFC using the Contribution Guide template (in Resources → Docs)
2. Design review → Engineering review → Accessibility review → Ship
3. Every merged change updates docs and the CHANGELOG

Use **#design-system** in Slack for quick questions. Tag @design-team for review requests.`,
      },
      {
        title: "Resource upload standards",
        content: `Follow this naming convention when adding new assets:

\`\`\`
brand/       schoolasium-logo-{variant}-{size}.{ext}
fonts/       {FontName}-{Weight}.{ext}
tokens/      {format}.{ext}   (design-tokens.json)
components/  {Name}-kit-v{version}.{ext}
docs/        {KEBAB-TITLE}.md
\`\`\`

Always increment the version and update src/lib/resources.ts.`,
      },
      {
        title: "AI usage rules for employees",
        content: `**Do:**
• Paste tokens.css into AI context before requesting components
• Reference exact token names (var(--color-primary-500), not "yellow")
• Include WCAG contrast ratio in colour-related prompts
• Ask AI to audit for hard-coded values before committing

**Don't:**
• Ask for colours, gradients, or spacing outside the token set
• Use AI-generated logo variations without design review
• Commit AI code without checking all values against the token spec

Full prompt library is on the AI Guidelines page.`,
      },
    ],
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding Rules",
    color: "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10",
    topics: [
      {
        title: "Logo usage rules",
        content: `**Horizontal logo** — marketing headers, hero banners, OG cards. Min width: 120px.
**Square mark** — app icons, auth screens, favicons, social avatars. Min: 32×32px.
**Clear space** — padding equal to the height of the "S" letterform on all sides.

**Approved backgrounds:**
• Dark (#0A0E1A): standard logo
• Light (#FFFFFF): standard logo at full opacity
• Busy/photo: place in #111827 chip, 12px padding, 12px radius

**Never:** stretch, rotate, recolour outside brand palette, apply arbitrary shadows, place on low-contrast yellow.`,
      },
      {
        title: "Colour rules",
        content: `**Primary yellow** — primary CTAs, logo moments, key headlines, focus rings. Use sparingly.
**Tech cyan** — links, secondary actions, live/running states.
**Creator violet** — AI features, premium moments, achievements.

**Never:**
• Use colours outside the token set
• Pair yellow on white without a dark container (fails contrast)
• Create gradients that mix brand hues (cyan + violet = off-brand)
• Use colour as the only state signal — always pair with icon or label`,
      },
      {
        title: "Typography rules",
        content: `**Roboto** — all UI: navigation, buttons, headings, labels.
**Open Sans** — long-form reading: lesson content, documentation.
**JetBrains Mono** — all code: snippets, terminals, parameter values.

**Never use** Inter, Space Grotesk, Arial, or system-ui alone in product UI.

**Weights:**
• Display: font-weight 700, tracking -0.02em
• Section titles: font-weight 600
• Body: font-weight 400, line-height 1.55
• Labels/badges: font-weight 500, tracking 0.025em

Always pick sizes from the type token table — never invent intermediate sizes.`,
      },
    ],
  },
];

function renderContent(raw: string) {
  const parts = raw.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const code = part.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
      return (
        <pre key={i} className="bg-[var(--color-neutral-950)] border border-[var(--border)] rounded-xl p-4 text-[11px] font-mono text-[var(--color-secondary-300)] leading-relaxed overflow-x-auto whitespace-pre my-3">
          {code}
        </pre>
      );
    }
    return (
      <div key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
        {part.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
          seg.startsWith("**") ? (
            <strong key={j} className="text-[var(--foreground)] font-semibold">{seg.replace(/\*\*/g, "")}</strong>
          ) : seg
        )}
      </div>
    );
  });
}

function Accordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasCode = content.includes("```");

  function handleCopy() {
    const code = content.match(/```[\s\S]*?```/g)?.map((m) => m.replace(/```\w*\n?/g, "").replace(/\n?```$/, "")).join("\n\n") ?? content;
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--elevated)] transition-colors">
        <span className="text-sm font-medium text-[var(--foreground)]">{title}</span>
        <ChevronDown size={15} className={cn("text-[var(--text-muted)] transition-transform duration-200 shrink-0 ml-3", open ? "rotate-180" : "")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-[var(--border)] pt-4 space-y-2">
              {hasCode && (
                <div className="flex justify-end">
                  <button onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] hover:text-[var(--foreground)] px-2 py-1 rounded border border-[var(--border)] bg-[var(--elevated)] transition-colors">
                    {copied ? <Check size={10} className="text-[var(--color-success)]" /> : <Copy size={10} />}
                    {copied ? "Copied!" : "Copy code"}
                  </button>
                </div>
              )}
              {renderContent(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GuidePageClient() {
  const [activeSection, setActiveSection] = useState("getting-started");

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
      {/* Header */}
      <div className="py-12 border-b border-[var(--border)] mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
          <BookOpen size={11} className="text-[var(--color-primary-500)]" />
          User Guide · v1.0.0
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">User Guide</h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Everything you need to use, build with, and contribute to the Schoolasium Design System.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sections.map(({ id, icon: Icon, title, color }) => (
              <button key={id}
                onClick={() => { setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className={cn("flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors",
                  activeSection === id
                    ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]")}>
                <div className={cn("w-6 h-6 rounded-md flex items-center justify-center shrink-0", color)}>
                  <Icon size={12} strokeWidth={1.75} />
                </div>
                {title}
              </button>
            ))}
            <div className="pt-4 border-t border-[var(--border)] mt-4 space-y-1">
              {[
                { label: "Design Tokens",   href: "/tokens",        icon: Palette  },
                { label: "Components",      href: "/components",    icon: Package  },
                { label: "AI Guidelines",   href: "/ai-guidelines", icon: Bot      },
                { label: "Resources",       href: "/resources",     icon: Download },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors group">
                  <Icon size={12} strokeWidth={1.75} />
                  {label}
                  <ChevronRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-16">
          {sections.map(({ id, icon: Icon, title, color, topics }) => (
            <section key={id} id={id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color)}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight">{title}</h2>
              </div>
              <div className="space-y-2">
                {topics.map((t) => <Accordion key={t.title} title={t.title} content={t.content} />)}
              </div>
            </section>
          ))}

          {/* Quick links */}
          <div className="p-6 rounded-2xl border border-[var(--color-primary-500)]/20 bg-[var(--color-primary-500)]/5">
            <h3 className="text-base font-bold text-[var(--foreground)] mb-4">Still have questions?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Browse components", href: "/components",    icon: Package,  desc: "Live previews + code" },
                { label: "Design tokens",     href: "/tokens",        icon: Palette,  desc: "Colors, type, spacing" },
                { label: "Download resources",href: "/resources",     icon: Download, desc: "Fonts, logos, kits"    },
                { label: "AI guidelines",     href: "/ai-guidelines", icon: Bot,      desc: "Prompt templates"      },
              ].map(({ label, href, icon: Icon, desc }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--elevated)] hover:border-[var(--color-primary-500)]/30 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-500)]/10 flex items-center justify-center text-[var(--color-primary-500)] shrink-0">
                    <Icon size={14} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--foreground)] truncate">{label}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{desc}</div>
                  </div>
                  <ArrowRight size={13} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)] shrink-0 ml-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
