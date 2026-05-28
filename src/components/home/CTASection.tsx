"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Package, Users, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[var(--color-primary-500)]/20 bg-[var(--background)]"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/5 via-transparent to-[var(--color-accent-500)]/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[var(--color-primary-500)]/40 to-transparent" />
          <div className="bg-dots absolute inset-0 opacity-30 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-12 sm:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-primary-500)]/30 text-[var(--color-primary-400)] bg-[var(--color-primary-500)]/10 mb-6">
              <Sparkles size={11} />
              Ready to build?
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] mb-4">
              Start building with<br />
              <span className="text-gradient">Schoolasium DS</span>
            </h2>

            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-10">
              Join the design team and ship consistent, beautiful, accessible experiences
              for every student and teacher using Schoolasium.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Link
                href="/components"
                className={cn(
                  "group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold",
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
                href="/ai-guidelines"
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold",
                  "border border-[var(--color-accent-500)]/30 bg-[var(--color-accent-500)]/10",
                  "text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/20",
                  "transition-all duration-150 hover:-translate-y-0.5",
                )}
              >
                <Bot size={15} strokeWidth={1.75} />
                AI Guidelines
              </Link>
              <Link
                href="/employee-portal"
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold",
                  "border border-[var(--border)] bg-[var(--surface)]",
                  "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]",
                  "transition-all duration-150 hover:-translate-y-0.5",
                )}
              >
                <Users size={15} strokeWidth={1.75} />
                Employee Portal
              </Link>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto pt-10 border-t border-[var(--border)]">
              {[
                { value: "v1.0.0",  label: "Stable Release" },
                { value: "40+",     label: "Components" },
                { value: "WCAG AA", label: "Accessibility" },
                { value: "MIT",     label: "License" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-lg font-black text-[var(--foreground)]">{value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
