"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, Package, Palette, FolderOpen, Bot, BookOpen, ChevronRight, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESOURCES } from "@/lib/resources";

// ─── Search index ─────────────────────────────────────────────────────────────

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: React.ElementType;
  keywords: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  // Tokens
  { id: "tokens",       title: "Design Tokens",     description: "Colors, typography, spacing, radius, shadows, motion", category: "Tokens",     href: "/tokens",              icon: Palette,   keywords: ["color", "palette", "css", "variables", "typography", "spacing"] },
  { id: "tokens-color", title: "Color System",       description: "Primary, secondary, accent, neutral, semantic palettes", category: "Tokens",  href: "/tokens#colors",       icon: Palette,   keywords: ["color", "yellow", "cyan", "violet", "primary", "secondary"] },
  { id: "tokens-type",  title: "Typography Scale",   description: "Font families, sizes, weights, line heights",         category: "Tokens",     href: "/tokens#typography",   icon: Palette,   keywords: ["font", "roboto", "open sans", "jetbrains", "size"] },
  { id: "tokens-space", title: "Spacing System",     description: "4px-base spacing scale",                             category: "Tokens",     href: "/tokens#spacing",      icon: Palette,   keywords: ["spacing", "padding", "margin", "gap"] },
  { id: "tokens-radius",title: "Border Radius",      description: "From sharp to pill — 10 radius tokens",              category: "Tokens",     href: "/tokens#radius",       icon: Palette,   keywords: ["radius", "rounded", "corner", "border"] },
  { id: "tokens-shadow",title: "Shadows & Glows",    description: "Light mode shadows and dark mode glow effects",      category: "Tokens",     href: "/tokens#shadows",      icon: Palette,   keywords: ["shadow", "glow", "elevation", "depth"] },
  { id: "tokens-motion",title: "Motion System",      description: "Duration and easing tokens for animations",          category: "Tokens",     href: "/tokens#motion",       icon: Palette,   keywords: ["animation", "motion", "easing", "duration", "transition"] },
  // Components
  { id: "components",   title: "Component Library",  description: "40+ production-ready components with live previews",  category: "Components", href: "/components",          icon: Package,   keywords: ["button", "card", "input", "badge", "modal", "drawer", "tabs"] },
  { id: "comp-button",  title: "Button",             description: "5 variants, 3 sizes, loading state",                  category: "Components", href: "/components#button",   icon: Package,   keywords: ["button", "cta", "primary", "secondary", "accent"] },
  { id: "comp-badge",   title: "Badge",              description: "Compact status indicators — 7 semantic variants",    category: "Components",  href: "/components#badge",    icon: Package,   keywords: ["badge", "tag", "chip", "label", "status"] },
  { id: "comp-input",   title: "Input",              description: "Text field with label, hint, error, icon slots",     category: "Components",  href: "/components#input",    icon: Package,   keywords: ["input", "field", "form", "text", "email"] },
  { id: "comp-card",    title: "Card",               description: "Default, interactive, elevated, stats variants",     category: "Components",  href: "/components#card",     icon: Package,   keywords: ["card", "container", "panel", "surface"] },
  { id: "comp-alert",   title: "Alert",              description: "Inline feedback for success, info, warning, error",  category: "Components",  href: "/components#alert",    icon: Package,   keywords: ["alert", "banner", "notification", "toast", "message"] },
  { id: "comp-avatar",  title: "Avatar",             description: "User representation with image fallback + stacking", category: "Components",  href: "/components#avatar",   icon: Package,   keywords: ["avatar", "user", "profile", "image", "initials"] },
  { id: "comp-toggle",  title: "Switch / Toggle",    description: "Boolean settings with role=switch",                  category: "Components",  href: "/components#toggle",   icon: Package,   keywords: ["switch", "toggle", "checkbox", "boolean", "on off"] },
  // Resources (dynamic from registry)
  ...RESOURCES.map((r) => ({
    id: `res-${r.id}`, title: r.name, description: r.description,
    category: "Resources", href: "/resources", icon: FolderOpen, keywords: r.tags,
  })),
  // AI Guidelines
  { id: "ai",           title: "AI Guidelines",      description: "Prompt templates, do's & don'ts, AI workflows",     category: "AI",         href: "/ai-guidelines",       icon: Bot,       keywords: ["ai", "prompt", "gpt", "claude", "llm", "chatgpt"] },
  { id: "ai-component", title: "Component Prompts",  description: "Generate consistent components with AI",            category: "AI",         href: "/ai-guidelines",       icon: Bot,       keywords: ["ai", "component", "generate", "prompt"] },
  { id: "ai-color",     title: "Color Usage Prompts","description": "Use tokens correctly in AI-generated code",       category: "AI",         href: "/ai-guidelines",       icon: Bot,       keywords: ["ai", "color", "token", "hex", "variable"] },
  // Guide
  { id: "guide",        title: "User Guide",         description: "Getting started, developer guides, employee guides", category: "Guide",      href: "/guide",               icon: BookOpen,  keywords: ["guide", "getting started", "how to", "tutorial", "docs"] },
  { id: "guide-dev",    title: "Developer Guide",    description: "Component integration, theme setup, token usage",   category: "Guide",      href: "/guide#developers",    icon: BookOpen,  keywords: ["developer", "integration", "setup", "tailwind", "theme"] },
  // Portal
  { id: "portal",       title: "Employee Portal",    description: "Sign in to access internal resources and admin",    category: "Portal",     href: "/employee-portal",     icon: Zap,       keywords: ["portal", "login", "sign in", "employee", "auth"] },
];

const fuse = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: "title",       weight: 3 },
    { name: "keywords",    weight: 2 },
    { name: "description", weight: 1 },
    { name: "category",    weight: 1 },
  ],
  threshold: 0.35,
  includeScore: true,
});

const CATEGORY_COLORS: Record<string, string> = {
  Tokens:     "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
  Components: "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
  Resources:  "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  AI:         "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  Guide:      "text-[var(--color-info)]          bg-[var(--color-info)]/10",
  Portal:     "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
};

const RECENT_STORAGE_KEY = "sds-recent-searches";

function getRecent(): SearchItem[] {
  try {
    const stored = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!stored) return [];
    const ids = JSON.parse(stored) as string[];
    return ids.map((id) => SEARCH_INDEX.find((i) => i.id === id)).filter(Boolean) as SearchItem[];
  } catch { return []; }
}

function saveRecent(item: SearchItem) {
  try {
    const existing = getRecent().map((i) => i.id).filter((id) => id !== item.id);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify([item.id, ...existing].slice(0, 5)));
  } catch {}
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CommandPaletteProps { open: boolean; onClose: () => void }

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router  = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const [query,   setQuery]   = useState("");
  const [cursor,  setCursor]  = useState(0);
  const [recent,  setRecent]  = useState<SearchItem[]>([]);

  const results: SearchItem[] = query.trim()
    ? fuse.search(query).slice(0, 8).map((r) => r.item)
    : [];

  const display = query.trim() ? results : recent.slice(0, 6);
  const showRecent = !query.trim() && recent.length > 0;

  useEffect(() => { if (open) { setRecent(getRecent()); setQuery(""); setCursor(0); setTimeout(() => inputRef.current?.focus(), 60); } }, [open]);
  useEffect(() => { setCursor(0); }, [query]);

  function handleSelect(item: SearchItem) {
    saveRecent(item);
    router.push(item.href);
    onClose();
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, display.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (e.key === "Enter" && display[cursor]) handleSelect(display[cursor]);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1080] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -8 }}
            animate={{ scale: 1,    opacity: 1, y: 0 }}
            exit={{   scale: 0.96, opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--elevated)] shadow-[var(--shadow-dark-lg)] overflow-hidden"
            onKeyDown={handleKey}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components, tokens, resources…"
                className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-[var(--text-muted)] hover:text-[var(--foreground)]"><X size={14} /></button>
              )}
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
              {display.length === 0 ? (
                <div className="py-10 text-center text-sm text-[var(--text-muted)]">
                  {query ? "No results found" : "Start typing to search…"}
                </div>
              ) : (
                <>
                  {showRecent && (
                    <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Recent
                    </div>
                  )}
                  {display.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors",
                        i === cursor ? "bg-[var(--hover)]" : "hover:bg-[var(--hover)]",
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", CATEGORY_COLORS[item.category] ?? "text-[var(--text-muted)] bg-[var(--surface)]")}>
                        <item.icon size={14} strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--foreground)] truncate">{item.title}</div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate">{item.description}</div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1.5">
                        <span className="text-[10px] text-[var(--text-muted)]">{item.category}</span>
                        <ChevronRight size={12} className="text-[var(--text-muted)]" />
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border)] px-4 py-2 flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
              <span><kbd className="px-1 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)]">↑↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)]">↵</kbd> open</span>
              <span><kbd className="px-1 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)]">ESC</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
