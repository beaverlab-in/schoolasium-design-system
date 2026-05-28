"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Copy, Check, Sparkles, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const promptExamples = [
  {
    label: "Component Generation",
    good: `Create a Button component using the Schoolasium Design System.
Use bg-primary-500 for the background, text-black for text,
rounded-xl for border radius, and px-5 py-2.5 for padding.
Include hover:bg-primary-400 and transition-colors duration-150.
Export as a named component with TypeScript props.`,
    bad: `Make a button that looks cool with some gradient and shadows`,
  },
  {
    label: "Color Usage",
    good: `Use --color-primary-500 (#EAB308) for the CTA background.
Pair with black text (contrast ratio 11:1, WCAG AAA).
On hover, shift to --color-primary-400 (#FACC15).
In dark mode, this combination remains unchanged.`,
    bad: `Use yellow for the button but make it look more vibrant`,
  },
];

const rules = [
  { icon: CheckCircle, text: "Always reference design tokens, never hard-code hex values", good: true },
  { icon: CheckCircle, text: "Use semantic token names: bg-primary-500, not bg-yellow-500", good: true },
  { icon: CheckCircle, text: "Specify contrast ratios for any new color pairings", good: true },
  { icon: CheckCircle, text: "Include hover and focus states in every interactive component", good: true },
  { icon: XCircle, text: "Random gradients outside the brand palette", good: false },
  { icon: XCircle, text: "Hard-coded colors like #FFD700 or rgb(255,200,0)", good: false },
  { icon: XCircle, text: "Overriding outline:none without a focus replacement", good: false },
  { icon: XCircle, text: "Mixing font families not in the design system", good: false },
];

export function AISection() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  function copyPrompt() {
    navigator.clipboard.writeText(promptExamples[activePrompt].good).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--surface)]">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-accent-500)]/30 text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10 mb-4">
              <Bot size={11} />
              AI-Ready Guidelines
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)]">
              Use AI the{" "}
              <span className="text-gradient-violet">right way</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-2 max-w-md">
              Curated prompt templates that keep AI-generated code consistent with the Schoolasium design system.
            </p>
          </div>
          <Link
            href="/ai-guidelines"
            className="self-start sm:self-auto flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-400)] hover:text-[var(--color-accent-300)] transition-colors group"
          >
            View all guidelines
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Prompt builder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[var(--color-accent-500)]/20 bg-[var(--background)] overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex border-b border-[var(--border)] bg-[var(--surface)]">
              {promptExamples.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePrompt(i)}
                  className={cn(
                    "px-4 py-3 text-xs font-medium transition-colors border-b-2 -mb-px",
                    activePrompt === i
                      ? "text-[var(--color-accent-400)] border-[var(--color-accent-500)]"
                      : "text-[var(--text-muted)] border-transparent hover:text-[var(--foreground)]",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Good prompt */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[var(--color-success)]" />
                  <span className="text-xs font-semibold text-[var(--color-success)]">Good Prompt</span>
                </div>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  {copied ? <Check size={11} className="text-[var(--color-success)]" /> : <Copy size={11} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[var(--color-secondary-300)] leading-relaxed whitespace-pre-wrap bg-[var(--surface)] rounded-xl p-4 border border-[var(--color-success)]/20">
                {promptExamples[activePrompt].good}
              </pre>
            </div>

            {/* Bad prompt */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-1.5 mb-3">
                <XCircle size={14} className="text-[var(--color-error)]" />
                <span className="text-xs font-semibold text-[var(--color-error)]">Avoid This</span>
              </div>
              <pre className="text-[11px] font-mono text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap bg-[var(--surface)] rounded-xl p-4 border border-[var(--color-error)]/20 line-through opacity-60">
                {promptExamples[activePrompt].bad}
              </pre>
            </div>
          </motion.div>

          {/* Rules list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
              AI usage rules
            </div>
            {rules.map(({ icon: Icon, text, good }) => (
              <div
                key={text}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border transition-colors",
                  good
                    ? "border-[var(--color-success)]/20 bg-[var(--color-success)]/5 hover:bg-[var(--color-success)]/10"
                    : "border-[var(--color-error)]/20 bg-[var(--color-error)]/5 hover:bg-[var(--color-error)]/10",
                )}
              >
                <Icon
                  size={14}
                  className={cn("mt-0.5 flex-shrink-0", good ? "text-[var(--color-success)]" : "text-[var(--color-error)]")}
                />
                <span className="text-xs text-[var(--text-secondary)]">{good ? "✓ " : "✗ "}{text}</span>
              </div>
            ))}

            <div className="mt-4 p-4 rounded-xl border border-[var(--color-accent-500)]/20 bg-[var(--color-accent-500)]/5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[var(--color-accent-400)]" />
                <span className="text-xs font-semibold text-[var(--color-accent-400)]">AI Workflow Tip</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Paste the Schoolasium design token CSS file into your AI context window first.
                This grounds the model in your exact values before you ask for any component.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
