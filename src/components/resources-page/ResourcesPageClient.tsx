"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, Search, Download, Eye, Copy, Check,
  Image, Type, Palette, Code2, FileText, Layers,
  Lock, Globe, Filter, X, ExternalLink, Folder,
  FileJson, FileCode, Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types & data ─────────────────────────────────────────────────────────────

type Access = "public" | "employee";
type Category = "Brand" | "Typography" | "Tokens" | "Components" | "Code" | "Docs";

interface Resource {
  id: string;
  name: string;
  description: string;
  category: Category;
  access: Access;
  format: string;
  size: string;
  version: string;
  icon: React.ElementType;
  tags: string[];
  preview?: string;
}

const resources: Resource[] = [
  // Brand
  {
    id: "logo-horizontal", name: "Horizontal Logo", description: "Full wordmark + symbol. Use in headers, hero banners, OG cards.",
    category: "Brand", access: "public", format: "PNG", size: "2.1 MB", version: "1.0", icon: Image,
    tags: ["logo", "brand", "marketing"], preview: "4261 × 712 px",
  },
  {
    id: "logo-square", name: "Square Mark", description: "Symbol + compact wordmark. Auth screens, app icons, social avatars.",
    category: "Brand", access: "public", format: "PNG", size: "1.4 MB", version: "1.0", icon: Image,
    tags: ["logo", "brand", "icon"], preview: "1318 × 1318 px",
  },
  {
    id: "favicon-set", name: "Favicon Set", description: "Full favicon pack: 16px, 32px, 180px Apple touch, 192px + 512px Android Chrome.",
    category: "Brand", access: "public", format: "ZIP", size: "320 KB", version: "1.0", icon: Package,
    tags: ["favicon", "pwa", "brand"],
  },
  {
    id: "brand-guidelines", name: "Brand Guidelines PDF", description: "Complete brand standards — logo usage, color rules, typography, do/don'ts.",
    category: "Brand", access: "public", format: "PDF", size: "4.8 MB", version: "1.0", icon: FileText,
    tags: ["brand", "guidelines", "docs"],
  },
  {
    id: "bw-logo", name: "B&W Logo", description: "Black and white version for monochrome printing and low-color contexts.",
    category: "Brand", access: "public", format: "PNG", size: "980 KB", version: "1.0", icon: Image,
    tags: ["logo", "monochrome", "print"],
  },

  // Typography
  {
    id: "roboto", name: "Roboto", description: "Primary UI font. Weights: 300, 400, 500, 700, 900. Used for all navigation, buttons, and headings.",
    category: "Typography", access: "public", format: "TTF", size: "890 KB", version: "3.0", icon: Type,
    tags: ["font", "primary", "UI"],
  },
  {
    id: "open-sans", name: "Open Sans", description: "Secondary reading font. Weights: 300, 400, 600, 700. Used for long-form docs and lesson content.",
    category: "Typography", access: "public", format: "TTF", size: "760 KB", version: "1.2", icon: Type,
    tags: ["font", "secondary", "docs"],
  },
  {
    id: "jetbrains-mono", name: "JetBrains Mono", description: "Monospace font for all code blocks, terminal output, and parameter inputs.",
    category: "Typography", access: "public", format: "TTF", size: "540 KB", version: "2.3", icon: Type,
    tags: ["font", "mono", "code"],
  },

  // Tokens
  {
    id: "design-tokens-json", name: "design-tokens.json", description: "Full token set in W3C Design Tokens format. Import into Tokens Studio or Style Dictionary.",
    category: "Tokens", access: "public", format: "JSON", size: "14 KB", version: "1.0", icon: FileJson,
    tags: ["tokens", "json", "figma"],
  },
  {
    id: "tokens-css", name: "tokens.css", description: "CSS custom properties for all design tokens. Drop into any project as the first stylesheet.",
    category: "Tokens", access: "public", format: "CSS", size: "8 KB", version: "1.0", icon: FileCode,
    tags: ["tokens", "css", "variables"],
  },
  {
    id: "tokens-scss", name: "_tokens.scss", description: "SCSS partial with all design tokens as Sass variables. Fully compatible with the CSS var output.",
    category: "Tokens", access: "public", format: "SCSS", size: "9 KB", version: "1.0", icon: FileCode,
    tags: ["tokens", "scss", "sass"],
  },
  {
    id: "tailwind-config", name: "tailwind.config.ts", description: "Complete Tailwind v4 configuration extending the Schoolasium palette, shadows, radius, and animation.",
    category: "Tokens", access: "public", format: "TS", size: "6 KB", version: "1.0", icon: FileCode,
    tags: ["tailwind", "config", "tokens"],
  },

  // Components
  {
    id: "figma-kit", name: "Figma UI Kit", description: "Full component library with auto-layout, variants, and design tokens wired to the Figma Tokens plugin.",
    category: "Components", access: "employee", format: "FIGMA", size: "18 MB", version: "1.0", icon: Layers,
    tags: ["figma", "design", "components"],
  },
  {
    id: "icon-pack", name: "Icon Pack (SVG)", description: "Custom Schoolasium icon set — 80+ icons for block categories, boards, sensors, and platform actions.",
    category: "Components", access: "employee", format: "ZIP", size: "2.2 MB", version: "1.0", icon: Package,
    tags: ["icons", "svg", "components"],
  },
  {
    id: "illustration-set", name: "Illustration Set", description: "Empty states, onboarding screens, and decorative circuit motifs. Flat, palette-locked, editable SVGs.",
    category: "Components", access: "employee", format: "ZIP", size: "5.6 MB", version: "1.0", icon: Image,
    tags: ["illustrations", "empty-states", "svg"],
  },

  // Code
  {
    id: "nextjs-starter", name: "Next.js Starter", description: "Pre-configured Next.js 16 project with all design tokens, fonts, Tailwind config, and component scaffolding.",
    category: "Code", access: "employee", format: "ZIP", size: "3.1 MB", version: "1.0", icon: Code2,
    tags: ["nextjs", "starter", "template"],
  },
  {
    id: "component-registry", name: "Component Registry", description: "Barrel exports and registry metadata for all 40+ components. Drop-in for any design system tooling.",
    category: "Code", access: "employee", format: "TS", size: "22 KB", version: "1.0", icon: FileCode,
    tags: ["registry", "components", "typescript"],
  },
  {
    id: "eslint-config", name: "ESLint + Prettier Config", description: "Opinionated linting and formatting rules matching the Schoolasium code standards.",
    category: "Code", access: "public", format: "JSON", size: "4 KB", version: "1.0", icon: FileCode,
    tags: ["eslint", "prettier", "config"],
  },

  // Docs
  {
    id: "master-md", name: "MASTER.md", description: "The complete design system specification — brand, color, typography, motion, accessibility, and component contracts.",
    category: "Docs", access: "public", format: "MD", size: "68 KB", version: "1.0", icon: FileText,
    tags: ["docs", "spec", "brand"],
  },
  {
    id: "a11y-checklist", name: "Accessibility Checklist", description: "WCAG 2.2 AA verification checklist for every new component and page. Covers color, keyboard, ARIA, motion.",
    category: "Docs", access: "public", format: "PDF", size: "1.2 MB", version: "1.0", icon: FileText,
    tags: ["a11y", "wcag", "checklist"],
  },
  {
    id: "contribution-guide", name: "Contribution Guide", description: "How to propose, design, and ship new tokens, components, or docs. RFC template included.",
    category: "Docs", access: "public", format: "MD", size: "12 KB", version: "1.0", icon: FileText,
    tags: ["contribution", "governance", "process"],
  },
];

const categoryIcons: Record<Category, React.ElementType> = {
  Brand: Image, Typography: Type, Tokens: Palette,
  Components: Layers, Code: Code2, Docs: FileText,
};

const formatColors: Record<string, string> = {
  PNG:   "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
  ZIP:   "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
  PDF:   "text-[var(--color-error)]         bg-[var(--color-error)]/10",
  JSON:  "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  CSS:   "text-[var(--color-info)]          bg-[var(--color-info)]/10",
  SCSS:  "text-[var(--color-info)]          bg-[var(--color-info)]/10",
  TS:    "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
  FIGMA: "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  SVG:   "text-[var(--color-success)]       bg-[var(--color-success)]/10",
  TTF:   "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
  MD:    "text-[var(--text-secondary)]      bg-[var(--elevated)]",
};

// ─── Resource card ─────────────────────────────────────────────────────────────

function ResourceCard({ resource, onPreview }: { resource: Resource; onPreview: (r: Resource) => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(resource.name).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const IconComp = resource.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex flex-col p-5 rounded-2xl border transition-all duration-200",
        "bg-[var(--surface)] hover:bg-[var(--elevated)] hover:-translate-y-0.5",
        resource.access === "employee"
          ? "border-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/40"
          : "border-[var(--border)] hover:border-[var(--color-primary-500)]/30",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            resource.access === "employee"
              ? "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)]"
              : "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]",
          )}>
            <IconComp size={16} strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)] leading-tight">{resource.name}</div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">v{resource.version}</div>
          </div>
        </div>

        {/* Access badge */}
        <span className={cn(
          "flex-shrink-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
          resource.access === "employee"
            ? "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10 border-[var(--color-accent-500)]/30"
            : "text-[var(--color-success-dark)] bg-[var(--color-success)]/10 border-[var(--color-success)]/30",
        )}>
          {resource.access === "employee" ? <Lock size={8} /> : <Globe size={8} />}
          {resource.access === "employee" ? "Internal" : "Public"}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">{resource.description}</p>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", formatColors[resource.format] ?? "text-[var(--text-muted)] bg-[var(--elevated)]")}>
          {resource.format}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">{resource.size}</span>
        {resource.preview && (
          <span className="text-[10px] text-[var(--text-muted)]">{resource.preview}</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-[var(--border)]">
        <button
          onClick={() => onPreview(resource)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
        >
          <Eye size={11} />
          Preview
        </button>
        <button
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors flex-1 justify-center",
            resource.access === "employee"
              ? "border border-[var(--color-accent-500)]/30 bg-[var(--color-accent-500)]/8 text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/15"
              : "bg-[var(--color-primary-500)] text-black hover:bg-[var(--color-primary-400)]",
          )}
        >
          {resource.access === "employee" ? <Lock size={11} /> : <Download size={11} />}
          {resource.access === "employee" ? "Sign in to download" : "Download"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Preview modal ────────────────────────────────────────────────────────────

function PreviewModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const IconComp = resource.icon;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1040] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--elevated)] shadow-[var(--shadow-dark-lg)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-500)]/10 flex items-center justify-center">
                <IconComp size={15} className="text-[var(--color-primary-500)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--foreground)]">{resource.name}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{resource.format} · {resource.size} · v{resource.version}</div>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--hover)] transition-colors text-[var(--text-muted)]">
              <X size={16} />
            </button>
          </div>
          <div className="p-5">
            <div className="h-40 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-5">
              <div className="text-center">
                <IconComp size={32} className="text-[var(--text-muted)] mx-auto mb-2" strokeWidth={1} />
                <div className="text-xs text-[var(--text-muted)]">{resource.preview ?? `${resource.format} file`}</div>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-5">{resource.description}</p>
            <div className="flex flex-wrap gap-1 mb-5">
              {resource.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">{t}</span>
              ))}
            </div>
            <button
              className={cn(
                "w-full flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-semibold transition-colors",
                resource.access === "employee"
                  ? "border border-[var(--color-accent-500)]/30 text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/10"
                  : "bg-[var(--color-primary-500)] text-black hover:bg-[var(--color-primary-400)]",
              )}
            >
              {resource.access === "employee" ? <Lock size={14} /> : <Download size={14} />}
              {resource.access === "employee" ? "Sign in to download" : `Download ${resource.format}`}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

const categories: Array<Category | "All"> = ["All", "Brand", "Typography", "Tokens", "Components", "Code", "Docs"];

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ResourcesPageClient() {
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState<Category | "All">("All");
  const [access, setAccess]         = useState<Access | "all">("all");
  const [preview, setPreview]       = useState<Resource | null>(null);

  const filtered = resources.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q));
    const matchCat    = category === "All" || r.category === category;
    const matchAccess = access === "all" || r.access === access;
    return matchSearch && matchCat && matchAccess;
  });

  const publicCount   = resources.filter((r) => r.access === "public").length;
  const employeeCount = resources.filter((r) => r.access === "employee").length;

  return (
    <>
      {preview && <PreviewModal resource={preview} onClose={() => setPreview(null)} />}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="py-12 border-b border-[var(--border)] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
            <FolderOpen size={11} className="text-[var(--color-primary-500)]" />
            Resources Hub · {resources.length} assets
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">
            Resources
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mb-6">
            Brand assets, fonts, design tokens, component kits, code templates, and documentation — all versioned and ready to use.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Total assets",     value: String(resources.length), color: "text-[var(--foreground)]" },
              { label: "Public",           value: String(publicCount),      color: "text-[var(--color-success-dark)]" },
              { label: "Employee-only",    value: String(employeeCount),    color: "text-[var(--color-accent-400)]" },
              { label: "Categories",       value: "6",                      color: "text-[var(--color-secondary-400)]" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                <span className={cn("text-sm font-bold", color)}>{value}</span>
                <span className="text-xs text-[var(--text-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources…"
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary-500)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)]">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Access filter */}
          <div className="flex gap-1.5">
            {(["all", "public", "employee"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAccess(a)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  access === a
                    ? "bg-[var(--color-primary-500)] text-black"
                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
                )}
              >
                {a === "employee" && <Lock size={10} />}
                {a === "public"   && <Globe size={10} />}
                {a === "all" ? "All access" : a}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-8">
          {categories.map((cat) => {
            const CatIcon = cat === "All" ? Folder : categoryIcons[cat as Category];
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  category === cat
                    ? "bg-[var(--color-primary-500)]/15 text-[var(--color-primary-400)] border border-[var(--color-primary-500)]/30"
                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
                )}
              >
                <CatIcon size={11} strokeWidth={1.75} />
                {cat}
                <span className="text-[var(--text-muted)]">
                  ({cat === "All" ? resources.length : resources.filter((r) => r.category === cat).length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <FolderOpen size={40} className="text-[var(--text-muted)] mx-auto mb-4" strokeWidth={1} />
              <div className="text-sm text-[var(--text-muted)]">No resources match your filters</div>
              <button onClick={() => { setSearch(""); setCategory("All"); setAccess("all"); }}
                className="mt-3 text-xs text-[var(--color-primary-400)] hover:underline">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} onPreview={setPreview} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
