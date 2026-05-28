"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, FolderOpen, Download, Eye, FileText, Image, Code2, Palette, Type, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const resources = [
  {
    category: "Brand Assets",
    icon: Image,
    color: "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10",
    border: "border-[var(--color-primary-500)]/20 hover:border-[var(--color-primary-500)]/50",
    items: ["Horizontal Logo (PNG)", "Square Mark (PNG)", "Favicon Set", "Brand Guidelines PDF"],
    access: "public",
  },
  {
    category: "Typography",
    icon: Type,
    color: "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
    border: "border-[var(--color-secondary-500)]/20 hover:border-[var(--color-secondary-500)]/50",
    items: ["Roboto (300, 400, 500, 700)", "Open Sans (400, 600)", "JetBrains Mono (400, 700)", "Font Loading Config"],
    access: "public",
  },
  {
    category: "Design Tokens",
    icon: Palette,
    color: "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10",
    border: "border-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/50",
    items: ["design-tokens.json", "tokens.css", "_tokens.scss", "tailwind.config.ts"],
    access: "public",
  },
  {
    category: "Component Kits",
    icon: Layers,
    color: "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10",
    border: "border-[var(--color-primary-500)]/20 hover:border-[var(--color-primary-500)]/50",
    items: ["Figma UI Kit (v1.0)", "Icon Pack (SVG)", "Illustration Set", "Animation Presets"],
    access: "employee",
  },
  {
    category: "Code Templates",
    icon: Code2,
    color: "text-[var(--color-secondary-400)] bg-[var(--color-secondary-500)]/10",
    border: "border-[var(--color-secondary-500)]/20 hover:border-[var(--color-secondary-500)]/50",
    items: ["Next.js Starter", "Component Registry", "Storybook Config", "ESLint + Prettier"],
    access: "employee",
  },
  {
    category: "Documentation",
    icon: FileText,
    color: "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10",
    border: "border-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/50",
    items: ["MASTER.md (Design System Spec)", "Brand Standards", "Accessibility Checklist", "Contribution Guide"],
    access: "public",
  },
];

export function ResourcesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--background)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
              <FolderOpen size={11} className="text-[var(--color-primary-500)]" />
              Resources Hub
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)]">
              Everything in<br />
              <span className="text-gradient">one place</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-2 max-w-md">
              Brand assets, fonts, design tokens, code templates, and documentation — organized and ready to use.
            </p>
          </div>
          <Link
            href="/resources"
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors group"
          >
            Browse resources
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, i) => (
            <motion.div
              key={res.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "p-5 rounded-2xl border transition-all duration-200",
                "bg-[var(--surface)] hover:bg-[var(--elevated)] hover:-translate-y-0.5",
                res.border,
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", res.color)}>
                  <res.icon size={16} strokeWidth={1.75} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border",
                  res.access === "employee"
                    ? "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10 border-[var(--color-accent-500)]/30"
                    : "text-[var(--color-success-dark)] bg-[var(--color-success)]/10 border-[var(--color-success)]/30",
                )}>
                  {res.access === "employee" ? "🔒 Internal" : "Public"}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">{res.category}</h3>

              <ul className="space-y-1.5 mb-4">
                {res.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <div className="w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                  <Eye size={11} />
                  Preview
                </button>
                <button className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-colors",
                  res.access === "employee"
                    ? "border border-[var(--color-accent-500)]/30 text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/10"
                    : "border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)]",
                )}>
                  <Download size={11} />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
