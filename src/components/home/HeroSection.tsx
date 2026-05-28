"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Play, Layers, Palette, Package, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const floatingTokens = [
  { label: "primary-500", value: "#EAB308", color: "#EAB308", x: "8%",  y: "20%", delay: 0 },
  { label: "secondary-500", value: "#06B6D4", color: "#06B6D4", x: "88%", y: "15%", delay: 0.3 },
  { label: "accent-500",  value: "#8B5CF6", color: "#8B5CF6", x: "5%",  y: "65%", delay: 0.6 },
  { label: "neutral-900", value: "#111827", color: "#475569", x: "90%", y: "60%", delay: 0.9 },
];

const stats = [
  { value: "40+",  label: "Components" },
  { value: "120+", label: "Design Tokens" },
  { value: "3",    label: "Color Themes" },
  { value: "WCAG", label: "AA Compliant" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-primary-500)]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-secondary-500)]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--color-accent-500)]/5 blur-3xl pointer-events-none" />

      {/* Floating tokens */}
      {floatingTokens.map((token, i) => (
        <motion.div
          key={token.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: token.delay + 1, duration: 0.5 },
            scale:   { delay: token.delay + 1, duration: 0.5 },
            y: { delay: token.delay + 1.5, duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 glass-card rounded-xl pointer-events-none"
          style={{ left: token.x, top: token.y }}
        >
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: token.color }} />
          <div>
            <div className="text-[10px] font-mono text-[var(--text-secondary)]">{token.label}</div>
            <div className="text-[10px] font-mono text-[var(--text-muted)]">{token.value}</div>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
              "border border-[var(--color-primary-500)]/30 bg-[var(--color-primary-500)]/10",
              "text-[var(--color-primary-400)]",
            )}>
              <Sparkles size={12} />
              <span>Schoolasium Design System · v1.0.0</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05]"
          >
            <span className="text-[var(--foreground)]">Build with </span>
            <span className="text-gradient">consistency.</span>
            <br />
            <span className="text-[var(--foreground)]">Ship with </span>
            <span className="text-gradient-cyan">confidence.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="max-w-2xl text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            The centralized design ecosystem for Schoolasium — production-ready components,
            semantic design tokens, brand assets, and AI-ready guidelines for building
            world-class EdTech experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/components"
              className={cn(
                "group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                "bg-[var(--color-primary-500)] text-black",
                "hover:bg-[var(--color-primary-400)] transition-all duration-150",
                "hover:shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5",
              )}
            >
              <Package size={15} strokeWidth={2} />
              Browse Components
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/tokens"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                "border border-[var(--border)] bg-[var(--surface)]",
                "text-[var(--foreground)] hover:bg-[var(--hover)]",
                "transition-all duration-150 hover:-translate-y-0.5",
              )}
            >
              <Palette size={15} strokeWidth={1.75} />
              Design Tokens
            </Link>
            <Link
              href="/ai-guidelines"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                "border border-[var(--color-accent-500)]/30 bg-[var(--color-accent-500)]/10",
                "text-[var(--color-accent-400)]",
                "hover:bg-[var(--color-accent-500)]/20 transition-all duration-150 hover:-translate-y-0.5",
              )}
            >
              <Bot size={15} strokeWidth={1.75} />
              AI Guidelines
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-8 pt-8 border-t border-[var(--border)] w-full max-w-xl"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-black text-[var(--color-primary-500)]">{value}</span>
                <span className="text-xs text-[var(--text-muted)] font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero UI Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl overflow-hidden shadow-[var(--shadow-dark-lg)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--elevated)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[var(--color-error)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--color-success)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 py-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] rounded border border-[var(--border)] font-mono">
                  schoolasium.design/components
                </div>
              </div>
            </div>

            {/* Preview content */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Button group */}
              <div className="space-y-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-3">Button · variants</div>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold hover:bg-[var(--color-primary-400)] transition-colors">
                    Primary
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-sm text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
                    Secondary
                  </button>
                  <button className="w-full px-4 py-2 rounded-lg border border-[var(--color-accent-500)]/40 bg-[var(--color-accent-500)]/10 text-sm text-[var(--color-accent-400)] transition-colors">
                    Accent
                  </button>
                </div>
              </div>

              {/* Color swatches */}
              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-3">Color · primary</div>
                <div className="grid grid-cols-5 gap-1">
                  {["#FEF9C3","#FEF08A","#FDE047","#FACC15","#EAB308","#CA8A04","#A16207","#854D0E","#713F12","#3D210A"].map((c, i) => (
                    <div
                      key={c}
                      className="aspect-square rounded-md cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-[var(--color-primary-500)]" />
                    <span className="text-xs font-mono text-[var(--text-secondary)]">#EAB308</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">primary-500 · Brand Yellow</div>
                </div>
              </div>

              {/* Code snippet */}
              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-3">Code · usage</div>
                <pre className="text-[11px] font-mono text-[var(--text-secondary)] leading-relaxed overflow-hidden">
{`<Button
  variant="primary"
  size="md"
>
  Start Building
</Button>`}
                </pre>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                  <span className="text-[10px] text-[var(--text-muted)]">WCAG AA · 11:1 contrast</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--text-muted)]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--color-primary-500)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
