"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette, Package, Bot, Users, Layers, Zap,
  Shield, Globe, Code2, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Palette,
    title: "Semantic Design Tokens",
    description: "120+ tokens for color, typography, spacing, radius, shadows, and motion — all theme-aware and WCAG AA compliant.",
    color: "primary",
    gradient: "from-[var(--color-primary-500)]/20 to-transparent",
    border: "border-[var(--color-primary-500)]/20 hover:border-[var(--color-primary-500)]/50",
  },
  {
    icon: Package,
    title: "40+ Components",
    description: "Production-ready components from basic atoms to complex organisms — all with live previews, code snippets, and prop tables.",
    color: "secondary",
    gradient: "from-[var(--color-secondary-500)]/20 to-transparent",
    border: "border-[var(--color-secondary-500)]/20 hover:border-[var(--color-secondary-500)]/50",
  },
  {
    icon: Bot,
    title: "AI-Ready Guidelines",
    description: "Curated prompt templates, usage rules, and do/don't examples that keep AI-generated code consistent with the design system.",
    color: "accent",
    gradient: "from-[var(--color-accent-500)]/20 to-transparent",
    border: "border-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/50",
  },
  {
    icon: Users,
    title: "Employee Portal",
    description: "Private access for internal teams — downloadable assets, brand kits, internal templates, and team announcements.",
    color: "primary",
    gradient: "from-[var(--color-primary-500)]/15 to-transparent",
    border: "border-[var(--color-primary-500)]/20 hover:border-[var(--color-primary-500)]/50",
  },
  {
    icon: Layers,
    title: "Multi-Theme Support",
    description: "Dark mode (default), light mode, and system theme — with smooth animated transitions and full token coverage.",
    color: "secondary",
    gradient: "from-[var(--color-secondary-500)]/15 to-transparent",
    border: "border-[var(--color-secondary-500)]/20 hover:border-[var(--color-secondary-500)]/50",
  },
  {
    icon: Shield,
    title: "Accessibility First",
    description: "Every token pair verified against WCAG 2.2 AA. Keyboard navigation, ARIA patterns, and screen reader support built-in.",
    color: "accent",
    gradient: "from-[var(--color-accent-500)]/15 to-transparent",
    border: "border-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/50",
  },
];

const iconColors: Record<string, string> = {
  primary:   "text-[var(--color-primary-500)]  bg-[var(--color-primary-500)]/10",
  secondary: "text-[var(--color-secondary-500)] bg-[var(--color-secondary-500)]/10",
  accent:    "text-[var(--color-accent-500)]    bg-[var(--color-accent-500)]/10",
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative p-6 rounded-2xl border transition-all duration-300",
        "bg-[var(--surface)] hover:bg-[var(--elevated)]",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-dark-md)]",
        feature.border,
      )}
    >
      {/* Gradient top edge */}
      <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300", feature.gradient)} />

      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", iconColors[feature.color])}>
        <feature.icon size={20} strokeWidth={1.75} />
      </div>

      <h3 className="text-[15px] font-semibold text-[var(--foreground)] mb-2">{feature.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-5">
            <Zap size={11} className="text-[var(--color-primary-500)]" />
            Why Schoolasium DS
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-4">
            Everything you need to{" "}
            <span className="text-gradient">build faster</span>
          </h2>
          <p className="max-w-xl mx-auto text-[var(--text-secondary)] text-lg">
            One platform for designers and developers to stay consistent, ship faster,
            and build experiences kids love to use.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 p-6 rounded-2xl glass-card border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center">
              <Sparkles size={20} className="text-[var(--color-primary-500)]" />
            </div>
            <div>
              <div className="font-semibold text-[var(--foreground)] text-sm">Built on your existing stack</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                Next.js · TypeScript · TailwindCSS · Framer Motion · Lucide Icons
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Next.js", "TypeScript", "Tailwind", "Framer", "Lucide"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
