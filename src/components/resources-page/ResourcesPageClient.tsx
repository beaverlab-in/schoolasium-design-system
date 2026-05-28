"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FolderOpen, Search, Download, Eye, Copy, Check,
  Lock, Globe, X, Image as ImageIcon, Type, Code2,
  FileText, Layers, Palette, Folder, FileJson, FileCode,
  Package, AlertCircle, ExternalLink,
} from "lucide-react";
import { RESOURCES, canAccessResource } from "@/lib/resources";
import type { Resource, ResourceCategory } from "@/lib/resources";
import { useAuthStore }     from "@/lib/store/authStore";
import { useActivityStore } from "@/lib/store/activityStore";
import { cn } from "@/lib/utils";

// ─── Format colour map ────────────────────────────────────────────────────────

const FORMAT_COLORS: Record<string, string> = {
  PNG:   "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
  ZIP:   "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
  PDF:   "text-[var(--color-error)]         bg-[var(--color-error)]/10",
  JSON:  "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  CSS:   "text-[var(--color-info)]          bg-[var(--color-info)]/10",
  SCSS:  "text-[var(--color-info)]          bg-[var(--color-info)]/10",
  TS:    "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
  JS:    "text-[var(--color-warning-dark)]  bg-[var(--color-warning)]/10",
  FIGMA: "text-[var(--color-accent-400)]    bg-[var(--color-accent-500)]/10",
  TTF:   "text-[var(--color-primary-400)]   bg-[var(--color-primary-500)]/10",
  MD:    "text-[var(--text-secondary)]      bg-[var(--elevated)]",
};

const CATEGORY_ICONS: Record<ResourceCategory, React.ElementType> = {
  Brand:      ImageIcon,
  Typography: Type,
  Tokens:     Palette,
  Components: Layers,
  Code:       Code2,
  Docs:       FileText,
};

// ─── Simple syntax highlighter ────────────────────────────────────────────────

function highlightCode(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // strings
    .replace(/"([^"]*?)"/g, '<span style="color:#93c5fd">"$1"</span>')
    // property keys in JSON
    .replace(/(<span[^>]*>"[^"]*?"<\/span>)(\s*:)/g, '<span style="color:#fcd34d">$1</span>$2')
    // CSS / SCSS comments
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6b7280">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span style="color:#6b7280">$1</span>')
    // CSS property values
    .replace(/(#[0-9a-fA-F]{3,8})/g, '<span style="color:#34d399">$1</span>')
    // keywords
    .replace(/\b(const|let|var|import|export|from|type|interface|function|return|default)\b/g, '<span style="color:#c084fc">$1</span>');
}

// ─── Preview modal ────────────────────────────────────────────────────────────

function PreviewModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const user     = useAuthStore((s) => s.user);
  const logActivity = useActivityStore((s) => s.log);
  const canAccess = canAccessResource(resource, user?.role);
  const [copied, setCopied] = useState(false);

  function handleDownload() {
    if (!resource.downloadPath) return;
    logActivity({ type: "download", detail: `Downloaded ${resource.name}`, resourceId: resource.id });
    // Programmatic download
    const a = document.createElement("a");
    a.href     = resource.downloadPath;
    a.download = resource.downloadPath.split("/").pop() ?? resource.name;
    a.click();
  }

  function handleCopy() {
    if (!resource.previewData) return;
    navigator.clipboard.writeText(resource.previewData).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1040] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[var(--border)] bg-[var(--elevated)] shadow-[var(--shadow-dark-lg)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                resource.access === "employee" ? "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)]" : "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]")}>
                {(() => { const Icon = CATEGORY_ICONS[resource.category]; return <Icon size={15} strokeWidth={1.75} />; })()}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[var(--foreground)] truncate">{resource.name}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{resource.format} · {resource.size} · v{resource.version}</div>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--hover)] transition-colors text-[var(--text-muted)] flex-shrink-0">
              <X size={16} />
            </button>
          </div>

          {/* Preview body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Image preview */}
            {resource.previewType === "image" && resource.downloadPath && (
              <div className="relative w-full rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center p-6">
                <div className="checkered-bg absolute inset-0 opacity-30 rounded-xl"
                  style={{ backgroundImage: "repeating-conic-gradient(#334155 0% 25%, transparent 0% 50%)", backgroundSize: "16px 16px" }} />
                <Image
                  src={resource.downloadPath}
                  alt={resource.name}
                  width={600}
                  height={200}
                  className="relative z-10 max-h-48 w-auto object-contain"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}

            {/* Font preview */}
            {resource.previewType === "font" && (
              <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-6 space-y-4">
                <div className="text-xs text-[var(--text-muted)] font-mono mb-2">{resource.name} — live rendering</div>
                {[300, 400, 500, 700].map((weight) => (
                  <div key={weight} className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                    <div className="text-[10px] text-[var(--text-muted)] mb-1">weight {weight}</div>
                    <div
                      className={cn("text-lg text-[var(--foreground)] leading-snug",
                        resource.id === "jetbrains-mono" ? "font-mono" : "")}
                      style={{ fontWeight: weight }}
                    >
                      {resource.previewData ?? "The quick brown fox jumps over the lazy dog"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Code preview */}
            {resource.previewType === "code" && resource.previewData && (
              <div className="rounded-xl bg-[var(--color-neutral-950)] border border-[var(--border)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{resource.format}</span>
                  <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
                    {copied ? <Check size={10} className="text-[var(--color-success)]" /> : <Copy size={10} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre
                  className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: highlightCode(resource.previewData) }}
                />
              </div>
            )}

            {/* Figma / unavailable */}
            {(resource.previewType === "figma" || resource.previewType === "none") && (
              <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                {(() => { const Icon = CATEGORY_ICONS[resource.category]; return <Icon size={32} className="text-[var(--text-muted)] mb-3" strokeWidth={1} />; })()}
                <div className="text-sm text-[var(--text-muted)]">Preview not available for this file type</div>
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-[var(--text-secondary)]">{resource.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {resource.tags.map((t) => (
                <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">{t}</span>
              ))}
            </div>

            {/* Dimensions */}
            {resource.dimensions && (
              <div className="text-xs text-[var(--text-muted)]">Dimensions: {resource.dimensions}</div>
            )}
          </div>

          {/* Footer / download */}
          <div className="flex-shrink-0 border-t border-[var(--border)] px-5 py-4 flex gap-2">
            {!canAccess ? (
              <div className="flex items-center gap-2 flex-1 p-3 rounded-xl border border-[var(--color-accent-500)]/20 bg-[var(--color-accent-500)]/5 text-sm text-[var(--color-accent-400)]">
                <Lock size={14} />
                Sign in with an employee account to download this resource.
              </div>
            ) : resource.downloadPath ? (
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-[var(--color-primary-500)] text-black text-sm font-semibold hover:bg-[var(--color-primary-400)] transition-all hover:shadow-[var(--shadow-glow-primary)]"
              >
                <Download size={14} />
                Download {resource.format}
              </button>
            ) : (
              <div className="flex items-center gap-2 flex-1 p-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)]">
                <AlertCircle size={14} />
                File hosted externally — contact the design team for access.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Resource card ────────────────────────────────────────────────────────────

function ResourceCard({ resource, onPreview }: { resource: Resource; onPreview: (r: Resource) => void }) {
  const user      = useAuthStore((s) => s.user);
  const logActivity = useActivityStore((s) => s.log);
  const canAccess = canAccessResource(resource, user?.role);
  const Icon      = CATEGORY_ICONS[resource.category];

  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    if (!canAccess || !resource.downloadPath) { onPreview(resource); return; }
    logActivity({ type: "download", detail: `Downloaded ${resource.name}`, resourceId: resource.id });
    const a = document.createElement("a");
    a.href     = resource.downloadPath;
    a.download = resource.downloadPath.split("/").pop() ?? resource.name;
    a.click();
  }

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
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            resource.access === "employee"
              ? "bg-[var(--color-accent-500)]/10 text-[var(--color-accent-400)]"
              : "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)]")}>
            <Icon size={16} strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)] leading-tight">{resource.name}</div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">v{resource.version}</div>
          </div>
        </div>
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

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">{resource.description}</p>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", FORMAT_COLORS[resource.format] ?? "text-[var(--text-muted)] bg-[var(--elevated)]")}>
          {resource.format}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">{resource.size}</span>
        {resource.dimensions && <span className="text-[10px] text-[var(--text-muted)]">{resource.dimensions}</span>}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">{tag}</span>
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
          onClick={handleDownload}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors flex-1 justify-center",
            !canAccess
              ? "border border-[var(--color-accent-500)]/30 text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/10"
              : resource.downloadPath
                ? "bg-[var(--color-primary-500)] text-black hover:bg-[var(--color-primary-400)]"
                : "border border-[var(--border)] text-[var(--text-muted)] cursor-default",
          )}
        >
          {!canAccess ? <Lock size={11} /> : <Download size={11} />}
          {!canAccess ? "Sign in to download" : resource.downloadPath ? "Download" : "External"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Category tabs ────────────────────────────────────────────────────────────

const CATEGORIES: Array<ResourceCategory | "All"> = ["All", "Brand", "Typography", "Tokens", "Components", "Code", "Docs"];

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ResourcesPageClient() {
  const user    = useAuthStore((s) => s.user);
  const [search, setSearch]   = useState("");
  const [category, setCategory] = useState<ResourceCategory | "All">("All");
  const [access, setAccess]   = useState<"all" | "public" | "employee">("all");
  const [preview, setPreview] = useState<Resource | null>(null);

  const filtered = RESOURCES.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q));
    const matchCat    = category === "All" || r.category === category;
    const matchAccess = access === "all" || r.access === access;
    return matchSearch && matchCat && matchAccess;
  });

  const publicCount   = RESOURCES.filter((r) => r.access === "public").length;
  const employeeCount = RESOURCES.filter((r) => r.access === "employee").length;

  return (
    <>
      {preview && <PreviewModal resource={preview} onClose={() => setPreview(null)} />}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
        {/* Page header */}
        <div className="py-12 border-b border-[var(--border)] mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
            <FolderOpen size={11} className="text-[var(--color-primary-500)]" />
            Resources Hub · {RESOURCES.length} assets
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">Resources</h1>
          <p className="text-[var(--text-secondary)] max-w-xl mb-6">
            Brand assets, fonts, design tokens, component kits, code templates, and documentation — all versioned and ready to download.
          </p>

          {/* Auth notice */}
          {!user && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--color-info)]/20 bg-[var(--color-info)]/5 max-w-lg">
              <AlertCircle size={14} className="text-[var(--color-info)] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--color-info-dark)]">Sign in to unlock all resources.</span>{" "}
                Employee-only assets require authentication via the Employee Portal.
              </p>
            </div>
          )}

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { label: "Total",         value: String(RESOURCES.length), color: "text-[var(--foreground)]" },
              { label: "Public",        value: String(publicCount),      color: "text-[var(--color-success-dark)]" },
              { label: "Internal only", value: String(employeeCount),    color: "text-[var(--color-accent-400)]" },
              { label: "Categories",    value: "6",                      color: "text-[var(--color-secondary-400)]" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                <span className={cn("text-sm font-bold", color)}>{value}</span>
                <span className="text-xs text-[var(--text-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources…"
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary-500)] transition-colors"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"><X size={12} /></button>}
          </div>
          <div className="flex gap-1.5">
            {(["all", "public", "employee"] as const).map((a) => (
              <button key={a} onClick={() => setAccess(a)} className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                access === a ? "bg-[var(--color-primary-500)] text-black" : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
              )}>
                {a === "employee" && <Lock size={10} />}
                {a === "public" && <Globe size={10} />}
                {a === "all" ? "All access" : a}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-8">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat === "All" ? Folder : CATEGORY_ICONS[cat as ResourceCategory];
            const count   = cat === "All" ? RESOURCES.length : RESOURCES.filter((r) => r.category === cat).length;
            return (
              <button key={cat} onClick={() => setCategory(cat)} className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                category === cat
                  ? "bg-[var(--color-primary-500)]/15 text-[var(--color-primary-400)] border border-[var(--color-primary-500)]/30"
                  : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
              )}>
                <CatIcon size={11} strokeWidth={1.75} />
                {cat}
                <span className="text-[var(--text-muted)]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
              <FolderOpen size={40} className="text-[var(--text-muted)] mx-auto mb-4" strokeWidth={1} />
              <div className="text-sm text-[var(--text-muted)]">No resources match your filters</div>
              <button onClick={() => { setSearch(""); setCategory("All"); setAccess("all"); }}
                className="mt-3 text-xs text-[var(--color-primary-400)] hover:underline">Clear filters</button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
