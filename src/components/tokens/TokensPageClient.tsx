"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Palette, Type, Layers, Move, Circle, Zap, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const colorGroups = [
  {
    id: "primary",
    name: "Primary — Schoolasium Yellow",
    description: "Brand anchor. Use for CTAs, focus rings, logo moments.",
    shades: [
      { token: "primary-50",  hex: "#FEFCE8", textDark: true  },
      { token: "primary-100", hex: "#FEF9C3", textDark: true  },
      { token: "primary-200", hex: "#FEF08A", textDark: true  },
      { token: "primary-300", hex: "#FDE047", textDark: true  },
      { token: "primary-400", hex: "#FACC15", textDark: true  },
      { token: "primary-500", hex: "#EAB308", textDark: true,  brand: true },
      { token: "primary-600", hex: "#CA8A04", textDark: false },
      { token: "primary-700", hex: "#A16207", textDark: false },
      { token: "primary-800", hex: "#854D0E", textDark: false },
      { token: "primary-900", hex: "#713F12", textDark: false },
    ],
  },
  {
    id: "secondary",
    name: "Secondary — Tech Cyan",
    description: "Technology, links, live data, action affordances.",
    shades: [
      { token: "secondary-50",  hex: "#ECFEFF", textDark: true  },
      { token: "secondary-100", hex: "#CFFAFE", textDark: true  },
      { token: "secondary-300", hex: "#67E8F9", textDark: true  },
      { token: "secondary-400", hex: "#22D3EE", textDark: true  },
      { token: "secondary-500", hex: "#06B6D4", textDark: true,  brand: true },
      { token: "secondary-600", hex: "#0891B2", textDark: false },
      { token: "secondary-700", hex: "#0E7490", textDark: false },
      { token: "secondary-900", hex: "#164E63", textDark: false },
    ],
  },
  {
    id: "accent",
    name: "Accent — Creator Violet",
    description: "Creative, premium, AI suggestions, achievements.",
    shades: [
      { token: "accent-300", hex: "#C4B5FD", textDark: true  },
      { token: "accent-400", hex: "#A78BFA", textDark: true  },
      { token: "accent-500", hex: "#8B5CF6", textDark: false, brand: true },
      { token: "accent-600", hex: "#7C3AED", textDark: false },
      { token: "accent-700", hex: "#6D28D9", textDark: false },
    ],
  },
  {
    id: "neutral",
    name: "Neutrals — Slate Foundation",
    description: "Backgrounds, surfaces, text, borders — the IDE feel.",
    shades: [
      { token: "neutral-0",   hex: "#FFFFFF", textDark: true  },
      { token: "neutral-50",  hex: "#F8FAFC", textDark: true  },
      { token: "neutral-100", hex: "#F1F5F9", textDark: true  },
      { token: "neutral-200", hex: "#E2E8F0", textDark: true  },
      { token: "neutral-300", hex: "#CBD5E1", textDark: true  },
      { token: "neutral-400", hex: "#94A3B8", textDark: false },
      { token: "neutral-500", hex: "#64748B", textDark: false },
      { token: "neutral-600", hex: "#475569", textDark: false },
      { token: "neutral-700", hex: "#334155", textDark: false },
      { token: "neutral-800", hex: "#1F2937", textDark: false },
      { token: "neutral-900", hex: "#111827", textDark: false },
      { token: "neutral-950", hex: "#0A0E1A", textDark: false },
    ],
  },
  {
    id: "semantic",
    name: "Semantic",
    description: "Communicating state — success, warning, error, info.",
    shades: [
      { token: "success",      hex: "#22C55E", textDark: true  },
      { token: "success-soft", hex: "#DCFCE7", textDark: true  },
      { token: "success-dark", hex: "#16A34A", textDark: false },
      { token: "warning",      hex: "#F59E0B", textDark: true  },
      { token: "warning-soft", hex: "#FEF3C7", textDark: true  },
      { token: "warning-dark", hex: "#D97706", textDark: false },
      { token: "error",        hex: "#EF4444", textDark: false },
      { token: "error-soft",   hex: "#FEE2E2", textDark: true  },
      { token: "error-dark",   hex: "#DC2626", textDark: false },
      { token: "info",         hex: "#3B82F6", textDark: false },
      { token: "info-soft",    hex: "#DBEAFE", textDark: true  },
      { token: "info-dark",    hex: "#2563EB", textDark: false },
    ],
  },
];

const typeScale = [
  { token: "display-2xl", size: "4.5rem", lh: "1.05", weight: "700",  ls: "-0.02em", desc: "Marketing hero" },
  { token: "display-xl",  size: "3.75rem",lh: "1.1",  weight: "700",  ls: "-0.02em", desc: "Section hero" },
  { token: "display-lg",  size: "3rem",   lh: "1.15", weight: "700",  ls: "-0.01em", desc: "Page hero" },
  { token: "heading-xl",  size: "2.25rem",lh: "1.2",  weight: "700",  ls: "0",       desc: "Page title" },
  { token: "heading-lg",  size: "1.875rem",lh:"1.25", weight: "600",  ls: "0",       desc: "Section title" },
  { token: "heading-md",  size: "1.5rem", lh: "1.3",  weight: "600",  ls: "0",       desc: "Card title" },
  { token: "heading-sm",  size: "1.25rem",lh: "1.35", weight: "600",  ls: "0",       desc: "Sub-section" },
  { token: "body-lg",     size: "1.125rem",lh:"1.6",  weight: "400",  ls: "0",       desc: "Intro, lesson body" },
  { token: "body-md",     size: "1rem",   lh: "1.55", weight: "400",  ls: "0",       desc: "Default body" },
  { token: "body-sm",     size: "0.875rem",lh:"1.5",  weight: "400",  ls: "0",       desc: "Secondary, captions" },
  { token: "body-xs",     size: "0.75rem",lh: "1.45", weight: "500",  ls: "0.025em", desc: "Labels, badges" },
  { token: "code-md",     size: "0.875rem",lh:"1.6",  weight: "400",  ls: "0",       desc: "Code preview", mono: true },
];

const spacingScale = [
  { token: "space-1",  value: "0.25rem", px: "4px"  },
  { token: "space-2",  value: "0.5rem",  px: "8px"  },
  { token: "space-3",  value: "0.75rem", px: "12px" },
  { token: "space-4",  value: "1rem",    px: "16px" },
  { token: "space-5",  value: "1.25rem", px: "20px" },
  { token: "space-6",  value: "1.5rem",  px: "24px" },
  { token: "space-8",  value: "2rem",    px: "32px" },
  { token: "space-10", value: "2.5rem",  px: "40px" },
  { token: "space-12", value: "3rem",    px: "48px" },
  { token: "space-16", value: "4rem",    px: "64px" },
  { token: "space-20", value: "5rem",    px: "80px" },
  { token: "space-24", value: "6rem",    px: "96px" },
  { token: "space-32", value: "8rem",    px: "128px"},
];

const radiusScale = [
  { token: "radius-none",  value: "0",      desc: "No rounding"  },
  { token: "radius-xs",    value: "2px",    desc: "Code tokens, micro-tags" },
  { token: "radius-sm",    value: "4px",    desc: "Inputs, small chips"     },
  { token: "radius-md",    value: "6px",    desc: "Buttons, dropdowns"      },
  { token: "radius-lg",    value: "8px",    desc: "Cards, panels"           },
  { token: "radius-xl",    value: "12px",   desc: "Modals, large surfaces"  },
  { token: "radius-2xl",   value: "16px",   desc: "Hero cards, features"    },
  { token: "radius-3xl",   value: "24px",   desc: "Marketing visuals"       },
  { token: "radius-block", value: "10px",   desc: "Visual programming blocks (signature)" },
  { token: "radius-full",  value: "9999px", desc: "Pills, avatars"          },
];

const shadowScale = [
  { token: "shadow-xs",         value: "0 1px 2px rgba(15,23,42,0.05)",          theme: "light" },
  { token: "shadow-sm",         value: "0 1px 3px rgba(15,23,42,0.08)",           theme: "light" },
  { token: "shadow-md",         value: "0 4px 6px rgba(15,23,42,0.07)",           theme: "light" },
  { token: "shadow-lg",         value: "0 10px 15px rgba(15,23,42,0.08)",         theme: "light" },
  { token: "shadow-xl",         value: "0 20px 25px rgba(15,23,42,0.10)",         theme: "light" },
  { token: "shadow-dark-sm",    value: "0 1px 2px rgba(0,0,0,0.4)",              theme: "dark"  },
  { token: "shadow-dark-md",    value: "0 4px 12px rgba(0,0,0,0.5)",             theme: "dark"  },
  { token: "shadow-dark-lg",    value: "0 10px 30px rgba(0,0,0,0.6)",            theme: "dark"  },
  { token: "shadow-glow-primary", value: "0 0 24px rgba(234,179,8,0.35)",        theme: "dark", glow: "#EAB308" },
  { token: "shadow-glow-secondary", value: "0 0 24px rgba(6,182,212,0.35)",      theme: "dark", glow: "#06B6D4" },
  { token: "shadow-glow-accent", value: "0 0 24px rgba(139,92,246,0.35)",        theme: "dark", glow: "#8B5CF6" },
];

const motionTokens = [
  { category: "Duration", tokens: [
    { token: "duration-instant",    value: "80ms",   desc: "Tooltips, color shifts" },
    { token: "duration-fast",       value: "150ms",  desc: "Hover, focus rings" },
    { token: "duration-base",       value: "250ms",  desc: "Default UI motion" },
    { token: "duration-slow",       value: "400ms",  desc: "Modals, drawers" },
    { token: "duration-slower",     value: "600ms",  desc: "Page transitions, hero" },
    { token: "duration-deliberate", value: "900ms",  desc: "Onboarding, ta-da moments" },
  ]},
  { category: "Easing", tokens: [
    { token: "ease-out",    value: "cubic-bezier(0.16, 1, 0.3, 1)",    desc: "Default — snappy settle" },
    { token: "ease-in-out", value: "cubic-bezier(0.65, 0, 0.35, 1)",   desc: "Symmetric motion" },
    { token: "ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)",desc: "Block snap — playful overshoot" },
    { token: "ease-decel",  value: "cubic-bezier(0, 0, 0.2, 1)",       desc: "Decelerate" },
  ]},
];

// ─── Shared components ────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
    >
      {copied ? <Check size={9} className="text-[var(--color-success)]" /> : <Copy size={9} />}
      {label ?? text}
    </button>
  );
}

function SectionHeader({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight">{title}</h2>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>
    </div>
  );
}

// ─── Section components ───────────────────────────────────────────────────────

function ColorsSection() {
  const [selected, setSelected] = useState<{ token: string; hex: string } | null>(null);

  return (
    <section>
      <SectionHeader
        id="colors"
        title="Color System"
        description="Semantic, theme-aware color tokens. Click any swatch to inspect."
      />
      <div className="space-y-6">
        {colorGroups.map((group) => (
          <div key={group.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)]">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{group.name}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{group.description}</p>
            </div>
            {/* Swatch bar */}
            <div className="flex h-16">
              {group.shades.map((shade) => (
                <button
                  key={shade.token}
                  onClick={() => setSelected(selected?.token === shade.token ? null : shade)}
                  className="relative flex-1 transition-all duration-150 hover:flex-[1.5] group"
                  style={{ backgroundColor: shade.hex }}
                  title={shade.token}
                >
                  {shade.brand && (
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase tracking-wider text-black/50">
                      Brand
                    </span>
                  )}
                  {selected?.token === shade.token && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/80" />
                  )}
                </button>
              ))}
            </div>
            {/* Detail panel */}
            {selected && group.shades.find((s) => s.token === selected.token) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 py-4 border-t border-[var(--border)] bg-[var(--elevated)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-[var(--border)]" style={{ backgroundColor: selected.hex }} />
                  <div>
                    <div className="text-xs font-semibold text-[var(--foreground)]">--color-{selected.token}</div>
                    <div className="text-xs text-[var(--text-muted)] font-mono">{selected.hex}</div>
                  </div>
                  <div className="flex gap-2 ml-auto flex-wrap">
                    <CopyButton text={`--color-${selected.token}`} label="CSS Var" />
                    <CopyButton text={`bg-[var(--color-${selected.token})]`} label="Tailwind" />
                    <CopyButton text={selected.hex} label={selected.hex} />
                  </div>
                </div>
              </motion.div>
            )}
            {/* Grid of all tokens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 p-3">
              {group.shades.map((shade) => (
                <button
                  key={shade.token}
                  onClick={() => setSelected(selected?.token === shade.token ? null : shade)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors",
                    selected?.token === shade.token
                      ? "bg-[var(--hover)] ring-1 ring-[var(--color-primary-500)]/40"
                      : "hover:bg-[var(--hover)]",
                  )}
                >
                  <div className="w-4 h-4 rounded-md flex-shrink-0 border border-white/10" style={{ backgroundColor: shade.hex }} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-[var(--foreground)] truncate">{shade.token}</div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">{shade.hex}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section>
      <SectionHeader
        id="typography"
        title="Typography Scale"
        description="Modular scale based on 1rem = 16px, ratio ~1.25. Roboto (UI), Open Sans (docs), JetBrains Mono (code)."
      />
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {typeScale.map(({ token, size, lh, weight, ls, desc, mono }) => (
            <div key={token} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--elevated)] transition-colors group">
              <div className="flex-1 min-w-0">
                <div
                  className={cn("truncate text-[var(--foreground)]", mono ? "font-mono text-[var(--color-secondary-400)]" : "")}
                  style={{ fontSize: `min(${size}, 3.5rem)`, fontWeight: weight, lineHeight: lh, letterSpacing: ls }}
                >
                  Aa
                </div>
              </div>
              <div className="flex-shrink-0 text-right space-y-1">
                <div className="text-xs font-mono text-[var(--color-primary-400)]">--text-{token}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{size} / lh {lh}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{desc}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={`text-${token}`} label="tw" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpacingSection() {
  return (
    <section>
      <SectionHeader
        id="spacing"
        title="Spacing Scale"
        description="4px base unit with a non-linear scale for IDE-density UIs."
      />
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {spacingScale.map(({ token, value, px }) => (
            <div key={token} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--elevated)] transition-colors group">
              <div className="w-32 flex-shrink-0 text-xs font-mono text-[var(--color-primary-400)]">--{token}</div>
              <div
                className="bg-[var(--color-primary-500)]/30 rounded h-3 flex-shrink-0"
                style={{ width: `min(${px}, 200px)` }}
              />
              <div className="flex items-center gap-3 ml-auto text-xs text-[var(--text-muted)] font-mono">
                <span>{px}</span>
                <span className="text-[var(--text-muted)]">{value}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={value} label={px} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RadiusSection() {
  return (
    <section>
      <SectionHeader
        id="radius"
        title="Border Radius"
        description="From sharp to pill. The signature block radius is 10px."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {radiusScale.map(({ token, value, desc }) => (
          <div
            key={token}
            className="p-4 border border-[var(--border)] bg-[var(--surface)] rounded-xl hover:bg-[var(--elevated)] transition-colors group"
          >
            <div
              className="w-12 h-12 bg-[var(--color-primary-500)]/20 border-2 border-[var(--color-primary-500)]/40 mb-3"
              style={{ borderRadius: value === "9999px" ? "9999px" : value }}
            />
            <div className="text-[11px] font-mono text-[var(--foreground)] mb-0.5">{token.replace("radius-", "")}</div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono mb-1">{value}</div>
            <div className="text-[10px] text-[var(--text-muted)] leading-tight">{desc}</div>
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={`rounded-${token.replace("radius-", "")}`} label="tw" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShadowsSection() {
  return (
    <section>
      <SectionHeader
        id="shadows"
        title="Shadows & Glows"
        description="Light theme uses physical drop shadows. Dark theme uses brand glows for elevation."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {shadowScale.map(({ token, value, theme, glow }) => (
          <div
            key={token}
            className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--elevated)] group hover:bg-[var(--hover)] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono text-[var(--color-primary-400)]">--{token}</div>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                theme === "dark"
                  ? "border-[var(--color-neutral-700)] text-[var(--text-muted)]"
                  : "border-[var(--color-neutral-300)] text-[var(--text-muted)]",
              )}>
                {theme} mode
              </span>
            </div>
            <div
              className="w-full h-16 rounded-xl bg-[var(--surface)] flex items-center justify-center mb-3"
              style={{ boxShadow: value }}
            >
              {glow && <div className="w-8 h-8 rounded-full" style={{ backgroundColor: glow, opacity: 0.8 }} />}
            </div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] truncate">{value}</div>
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={`shadow-${token.replace("shadow-", "")}`} label="tw" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MotionSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section>
      <SectionHeader
        id="motion"
        title="Motion System"
        description="Smooth, energetic, purposeful. Every animation has a reason: feedback, continuity, or delight."
      />
      {motionTokens.map(({ category, tokens }) => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{category}</h3>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] divide-y divide-[var(--border)] overflow-hidden">
            {tokens.map(({ token, value, desc }) => (
              <div
                key={token}
                className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--elevated)] transition-colors group"
              >
                <div className="text-xs font-mono text-[var(--color-primary-400)] w-40 flex-shrink-0">--{token}</div>
                <div className="flex-1 text-xs text-[var(--text-secondary)]">{desc}</div>
                <code className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:block">{value}</code>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={`var(--${token})`} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── Nav sidebar items ────────────────────────────────────────────────────────

const sidebarNav = [
  { id: "colors",     label: "Colors",     icon: Palette },
  { id: "typography", label: "Typography", icon: Type    },
  { id: "spacing",    label: "Spacing",    icon: Move    },
  { id: "radius",     label: "Radius",     icon: Circle  },
  { id: "shadows",    label: "Shadows",    icon: Layers  },
  { id: "motion",     label: "Motion",     icon: Zap     },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function TokensPageClient() {
  const [activeSection, setActiveSection] = useState("colors");

  function scrollTo(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Page header */}
      <div className="py-12 border-b border-[var(--border)] mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
          <Palette size={11} className="text-[var(--color-primary-500)]" />
          Design Tokens · v1.0.0
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">
          Design Tokens
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          120+ semantic tokens for every design decision — color, typography, spacing, radius, shadows, and motion.
          Reference them as CSS variables, Tailwind classes, or raw values.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sticky sidebar */}
        <aside className="hidden lg:flex flex-col w-48 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {sidebarNav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors",
                  activeSection === id
                    ? "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10 font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]",
                )}
              >
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-16 pb-24">
          <ColorsSection />
          <TypographySection />
          <SpacingSection />
          <RadiusSection />
          <ShadowsSection />
          <MotionSection />
        </main>
      </div>
    </div>
  );
}
