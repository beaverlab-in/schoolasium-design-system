"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const colorPalette = [
  {
    name: "Primary — Schoolasium Yellow",
    description: "Brand anchor. Use for CTAs, logo moments, and focal points.",
    shades: [
      { token: "primary-50",  hex: "#FEFCE8" },
      { token: "primary-100", hex: "#FEF9C3" },
      { token: "primary-200", hex: "#FEF08A" },
      { token: "primary-300", hex: "#FDE047" },
      { token: "primary-400", hex: "#FACC15" },
      { token: "primary-500", hex: "#EAB308", label: "Brand" },
      { token: "primary-600", hex: "#CA8A04" },
      { token: "primary-700", hex: "#A16207" },
      { token: "primary-800", hex: "#854D0E" },
      { token: "primary-900", hex: "#713F12" },
    ],
  },
  {
    name: "Secondary — Tech Cyan",
    description: "Technology and action. Links, live data, sensor indicators.",
    shades: [
      { token: "secondary-50",  hex: "#ECFEFF" },
      { token: "secondary-100", hex: "#CFFAFE" },
      { token: "secondary-200", hex: "#A5F3FC" },
      { token: "secondary-300", hex: "#67E8F9" },
      { token: "secondary-400", hex: "#22D3EE" },
      { token: "secondary-500", hex: "#06B6D4", label: "Brand" },
      { token: "secondary-600", hex: "#0891B2" },
      { token: "secondary-700", hex: "#0E7490" },
      { token: "secondary-800", hex: "#155E75" },
      { token: "secondary-900", hex: "#164E63" },
    ],
  },
  {
    name: "Accent — Creator Violet",
    description: "Creative and premium moments. AI suggestions, achievements.",
    shades: [
      { token: "accent-100", hex: "#EDE9FE" },
      { token: "accent-200", hex: "#DDD6FE" },
      { token: "accent-300", hex: "#C4B5FD" },
      { token: "accent-400", hex: "#A78BFA" },
      { token: "accent-500", hex: "#8B5CF6", label: "Brand" },
      { token: "accent-600", hex: "#7C3AED" },
      { token: "accent-700", hex: "#6D28D9" },
      { token: "accent-800", hex: "#5B21B6" },
      { token: "accent-900", hex: "#4C1D95" },
      { token: "accent-950", hex: "#2E1065" },
    ],
  },
];

function ColorSwatch({ shade, isActive, onClick }: {
  shade: { token: string; hex: string; label?: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={shade.token}
      className={cn(
        "relative flex-1 h-10 rounded-md transition-all duration-150",
        isActive ? "ring-2 ring-white/60 ring-offset-1 ring-offset-[var(--background)] scale-y-110" : "hover:scale-y-105",
      )}
      style={{ backgroundColor: shade.hex }}
    >
      {shade.label && (
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-black/60 uppercase tracking-wider">
          {shade.label}
        </span>
      )}
    </button>
  );
}

function PaletteRow({ palette, index }: { palette: typeof colorPalette[0]; index: number }) {
  const [activeSwatch, setActiveSwatch] = useState(palette.shades[5] ?? palette.shades[4]);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  function copy() {
    navigator.clipboard.writeText(activeSwatch.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">{palette.name}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{palette.description}</p>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors flex-shrink-0"
        >
          {copied ? <Check size={11} className="text-[var(--color-success)]" /> : <Copy size={11} />}
          {activeSwatch.hex}
        </button>
      </div>

      {/* Swatches */}
      <div className="flex gap-1 h-10">
        {palette.shades.map((shade) => (
          <ColorSwatch
            key={shade.token}
            shade={shade}
            isActive={activeSwatch.token === shade.token}
            onClick={() => setActiveSwatch(shade)}
          />
        ))}
      </div>

      {/* Active token info */}
      <div className="flex items-center justify-between text-xs">
        <code className="font-mono text-[var(--color-primary-400)]">--color-{activeSwatch.token}</code>
        <span className="text-[var(--text-muted)] font-mono">{activeSwatch.hex}</span>
      </div>
    </motion.div>
  );
}

const typescale = [
  { name: "display-2xl", size: "72px", weight: "700", example: "Build with Code" },
  { name: "heading-xl",  size: "36px", weight: "700", example: "Component Library" },
  { name: "heading-md",  size: "24px", weight: "600", example: "Design Tokens" },
  { name: "body-lg",     size: "18px", weight: "400", example: "Consistent, accessible, and elegant." },
  { name: "body-sm",     size: "14px", weight: "400", example: "Secondary label text and captions for interface context." },
  { name: "code-md",     size: "14px", weight: "400", example: "bg-primary-500 text-black rounded-lg", mono: true },
];

export function TokensPreviewSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
              <Palette size={11} className="text-[var(--color-primary-500)]" />
              Design Tokens
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)]">
              Tokens &amp; Branding
            </h2>
            <p className="text-[var(--text-secondary)] mt-2 max-w-md">
              Semantic, theme-aware tokens you can use as CSS variables, Tailwind classes, or raw values.
            </p>
          </div>
          <Link
            href="/tokens"
            className="self-start sm:self-auto flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)] transition-colors group"
          >
            View all tokens
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Color palette */}
        <div className="space-y-3 mb-12">
          {colorPalette.map((palette, i) => (
            <PaletteRow key={palette.name} palette={palette} index={i} />
          ))}
        </div>

        {/* Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Typography Scale</h3>
            <span className="text-xs text-[var(--text-muted)]">Roboto · Open Sans · JetBrains Mono</span>
          </div>
          <div className="space-y-4 divide-y divide-[var(--border)]">
            {typescale.map(({ name, size, weight, example, mono }) => (
              <div key={name} className="flex items-baseline justify-between gap-4 pt-4 first:pt-0">
                <div
                  className={cn(
                    "truncate text-[var(--foreground)]",
                    mono ? "font-mono text-[var(--color-secondary-400)]" : "",
                  )}
                  style={{ fontSize: `clamp(12px, ${size}, ${size})`, fontWeight: weight }}
                >
                  {example}
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs font-mono text-[var(--text-muted)]">{size}</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono">--text-{name}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
