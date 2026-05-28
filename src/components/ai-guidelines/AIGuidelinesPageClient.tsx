"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Copy, Check, CheckCircle, XCircle, Sparkles,
  Palette, Type, Layers, Shield, Zap, Code2,
  ChevronDown, ChevronRight, AlertTriangle, Info, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const promptCategories = [
  {
    id: "component",
    icon: Layers,
    title: "Component Generation",
    description: "Generate consistent, token-aware components",
    prompts: [
      {
        label: "Button component",
        good: `Create a Button component using the Schoolasium Design System.

Rules:
- Use bg-[var(--color-primary-500)] (#EAB308) for primary variant background
- Text must be text-black (contrast ratio 11:1, WCAG AAA)
- On hover: bg-[var(--color-primary-400)] + box-shadow: var(--shadow-glow-primary)
- On active: scale(0.98) with duration-instant (80ms)
- Border radius: rounded-xl (12px) for default size
- Min height: 36px for sm, 44px for md, 52px for lg (touch targets)
- Export as TypeScript with variant, size, loading, and disabled props
- Include focus-visible ring: 2px solid var(--color-primary-500) offset 2px`,
        bad: `Make a yellow button that looks modern and clean`,
      },
      {
        label: "Card component",
        good: `Build a Card component for the Schoolasium Design System.

Variants needed:
- default: border border-[var(--border)] bg-[var(--elevated)]
- interactive: same + cursor-pointer + hover:-translate-y-0.5 + hover:border-[var(--color-primary-500)]/30
- stats: border-[var(--color-secondary-500)]/20 + from-[var(--color-secondary-500)]/5 gradient

Padding options: sm=p-3, md=p-4, lg=p-6
Corner radius: rounded-xl
Transition: all 150ms var(--ease-out)
TypeScript props: variant, padding, children, className`,
        bad: `Create a card with a nice shadow and rounded corners`,
      },
      {
        label: "Navigation sidebar",
        good: `Build a docs sidebar using Schoolasium tokens.

Structure:
- Width: w-48, sticky top-24
- Active item: text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10 font-medium
- Inactive: text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]
- Font size: text-sm
- Icon size: 14px, strokeWidth 1.75 (Lucide)
- Border radius per item: rounded-lg
- Transition: colors 150ms`,
        bad: `Make a sidebar navigation with nice active states`,
      },
    ],
  },
  {
    id: "color",
    icon: Palette,
    title: "Color Usage",
    description: "Reference tokens correctly, never hard-code hex values",
    prompts: [
      {
        label: "Primary CTA color",
        good: `Apply the Schoolasium primary brand color to a CTA button.

Token: var(--color-primary-500) = #EAB308
Tailwind: bg-[var(--color-primary-500)] or bg-primary-500
Hover: var(--color-primary-400) = #FACC15
Active/pressed: var(--color-primary-600) = #CA8A04
Text on primary: always text-black (11:1 contrast ratio, WCAG AAA)
Focus ring: box-shadow var(--shadow-glow-primary)

Never use: bg-yellow-500, #FFD700, oklch(), or any non-token value`,
        bad: `Use a nice bright yellow for the button, something energetic`,
      },
      {
        label: "Dark mode surfaces",
        good: `Implement dark mode surfaces using Schoolasium tokens.

Layer hierarchy (darkest → lightest):
1. App background:  var(--color-dark-bg)       = #0A0E1A
2. Panels/sidebars: var(--color-dark-surface)   = #111827
3. Cards/modals:    var(--color-dark-elevated)  = #1F2937
4. Hover overlay:   var(--color-dark-hover)     = #2D3748
5. Borders:         var(--color-dark-border)    = #334155

Text pairing:
- Primary:   #F8FAFC  (var(--text-primary))
- Secondary: #94A3B8  (var(--text-secondary))
- Disabled:  #475569  (var(--text-muted))

Never use drop-shadows in dark mode — use glow effects instead.`,
        bad: `Make a dark card with a dark background and lighter text`,
      },
    ],
  },
  {
    id: "typography",
    icon: Type,
    title: "Typography",
    description: "Use the correct font family, size, and weight tokens",
    prompts: [
      {
        label: "Heading hierarchy",
        good: `Apply the Schoolasium type scale to a page heading section.

Hero headline:    font-black tracking-tight text-[4.5rem] leading-[1.05]  (--text-display-2xl)
Section title:    font-black tracking-tight text-[2.25rem] leading-[1.2]  (--text-heading-xl)
Card title:       font-semibold text-[1.5rem] leading-[1.3]               (--text-heading-md)
Body default:     font-normal text-[1rem] leading-[1.55]                  (--text-body-md)

Font families:
- UI + headings: var(--font-primary) = Roboto
- Long-form docs: var(--font-secondary) = Open Sans
- Code blocks:   var(--font-mono) = JetBrains Mono

Letter spacing on display: tracking-tight (-0.02em)
Never use: Inter, Arial, or system-ui alone`,
        bad: `Use big text for the heading and smaller text for the body`,
      },
    ],
  },
  {
    id: "accessibility",
    icon: Shield,
    title: "Accessibility",
    description: "Prompt for WCAG AA compliance from the start",
    prompts: [
      {
        label: "Accessible interactive element",
        good: `Build a toggle switch component that meets WCAG 2.2 AA.

Requirements:
- role="switch" aria-checked={checked}
- Visible focus ring: outline 2px solid var(--color-primary-500) offset 2px
- Min touch target: 44×44px
- Color alone never communicates state — include text label
- Keyboard: Space/Enter to toggle, Tab to focus
- Announce state changes: wrap in aria-live="polite" region
- Disabled state: opacity-60 + aria-disabled="true" + cursor-not-allowed
- Animation: respect prefers-reduced-motion (collapse to instant)`,
        bad: `Make a toggle that looks nice and works on click`,
      },
    ],
  },
];

const dosDonts = [
  {
    category: "Colors",
    icon: Palette,
    items: [
      { type: "do",   text: "Reference --color-primary-500 or bg-primary-500", code: "bg-[var(--color-primary-500)]" },
      { type: "do",   text: "Specify contrast ratio when pairing new colors",   code: "/* 11:1 WCAG AAA */" },
      { type: "do",   text: "Use semantic token names for meaning",             code: "text-[var(--color-error)]" },
      { type: "dont", text: "Hard-code hex values in components",               code: 'style={{ color: "#EAB308" }}' },
      { type: "dont", text: "Use Tailwind color utilities directly",            code: "bg-yellow-500 ← wrong" },
      { type: "dont", text: "Add drop shadows in dark mode",                   code: "shadow-lg ← use glow-primary" },
    ],
  },
  {
    category: "Spacing",
    icon: Layers,
    items: [
      { type: "do",   text: "Use 4px-base spacing tokens",                     code: "p-4 (16px) gap-6 (24px)" },
      { type: "do",   text: "Use space-6 (24px) for card padding",             code: "p-6 or padding: var(--space-6)" },
      { type: "do",   text: "Use space-8 (32px) between sections",             code: "gap-8 or mt-8" },
      { type: "dont", text: "Use arbitrary pixel values",                      code: 'style={{ margin: "17px" }}' },
      { type: "dont", text: "Mix spacing scales (Tailwind + inline styles)",   code: "mt-4 style={{ paddingTop: 12 }}" },
    ],
  },
  {
    category: "Typography",
    icon: Type,
    items: [
      { type: "do",   text: "Use the named type scale tokens",                  code: "text-heading-xl or text-body-md" },
      { type: "do",   text: "Roboto for UI, Open Sans for docs",               code: "font-primary / font-secondary" },
      { type: "do",   text: "Include letter-spacing on display text",          code: "tracking-tight on display-*" },
      { type: "dont", text: "Use Inter, Space Grotesk, or Arial",              code: "font-family: 'Inter' ← wrong" },
      { type: "dont", text: "Set line-height without a token",                 code: 'style={{ lineHeight: 1.4 }}' },
    ],
  },
  {
    category: "Motion",
    icon: Zap,
    items: [
      { type: "do",   text: "Use --ease-out for all transitions",              code: "transition-[var(--ease-out)]" },
      { type: "do",   text: "Use --ease-spring for playful snap moments",      code: "cubic-bezier(0.34,1.56,0.64,1)" },
      { type: "do",   text: "Respect prefers-reduced-motion",                  code: "@media (prefers-reduced-motion)" },
      { type: "dont", text: "Use linear easing for UI state changes",          code: "transition: all 300ms linear" },
      { type: "dont", text: "Animate for more than 900ms without reason",      code: "duration-[1200ms] ← too slow" },
    ],
  },
];

const workflows = [
  {
    step: "01",
    title: "Ground the model",
    description: "Paste the tokens.css or design-tokens.json into the context window before any component request. This gives the AI exact values.",
    tip: "Use the Resources page to download tokens.css, then share it as a file attachment.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Be specific with tokens",
    description: "Name exact CSS variable tokens (--color-primary-500), sizes (rounded-xl), and spacing (p-6) in every prompt. Ambiguous prompts produce off-spec output.",
    tip: "Copy-paste token names directly from the Tokens page to avoid typos.",
    icon: Code2,
  },
  {
    step: "03",
    title: "Specify accessibility requirements",
    description: "Include WCAG requirements, keyboard behavior, ARIA roles, and touch target sizes explicitly. AI won't add them unless asked.",
    tip: "Use the Accessibility Checklist from Resources as a prompt appendix.",
    icon: Shield,
  },
  {
    step: "04",
    title: "Review against the system",
    description: "After generation, paste the output back and ask the AI to check it against the design system rules. List which tokens it used vs. hard-coded.",
    tip: "Ask: 'Audit this component for any hard-coded values that should use design tokens.'",
    icon: CheckCircle,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
    >
      {copied ? <Check size={11} className="text-[var(--color-success)]" /> : <Copy size={11} />}
      {copied ? "Copied!" : (label ?? "Copy")}
    </button>
  );
}

function PromptCard({ prompt, isActive, onToggle }: {
  prompt: { label: string; good: string; bad: string };
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--elevated)] transition-colors"
      >
        <span className="text-sm font-medium text-[var(--foreground)]">{prompt.label}</span>
        <ChevronDown
          size={16}
          className={cn("text-[var(--text-muted)] transition-transform duration-200", isActive ? "rotate-180" : "")}
        />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-[var(--border)]">
              {/* Good prompt */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-[var(--color-success)]" />
                    <span className="text-xs font-semibold text-[var(--color-success)]">Good Prompt</span>
                  </div>
                  <CopyButton text={prompt.good} label="Copy prompt" />
                </div>
                <pre className="text-[11px] font-mono text-[var(--color-secondary-300)] leading-relaxed whitespace-pre-wrap bg-[var(--color-neutral-950)] rounded-xl p-4 border border-[var(--color-success)]/15 overflow-x-auto">
                  {prompt.good}
                </pre>
              </div>

              {/* Bad prompt */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <XCircle size={13} className="text-[var(--color-error)]" />
                  <span className="text-xs font-semibold text-[var(--color-error)]">Avoid This</span>
                </div>
                <pre className="text-[11px] font-mono text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap bg-[var(--color-neutral-950)] rounded-xl p-4 border border-[var(--color-error)]/15 opacity-70 line-through overflow-x-auto">
                  {prompt.bad}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function AIGuidelinesPageClient() {
  const [activeCategory, setActiveCategory] = useState("component");
  const [openPrompts, setOpenPrompts] = useState<Record<string, number | null>>({});

  function togglePrompt(catId: string, idx: number) {
    setOpenPrompts((prev) => ({
      ...prev,
      [catId]: prev[catId] === idx ? null : idx,
    }));
  }

  const activeGroup = promptCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
      {/* Page header */}
      <div className="py-12 border-b border-[var(--border)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-accent-500)]/30 text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10 mb-4">
          <Bot size={11} />
          AI Usage Guidelines · v1.0.0
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">
          Using AI with<br />
          <span className="text-gradient-violet">Schoolasium DS</span>
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Prompt templates, usage rules, and workflows for generating design-system-consistent code
          with any AI coding assistant.
        </p>
      </div>

      {/* ── Workflow steps ──────────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-xl font-black text-[var(--foreground)] mb-6">
          AI Workflow — 4 Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflows.map(({ step, title, description, tip, icon: Icon }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--elevated)] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl font-black text-[var(--color-primary-500)]/20 leading-none">{step}</span>
                <div className="w-9 h-9 rounded-xl bg-[var(--color-accent-500)]/10 flex items-center justify-center">
                  <Icon size={16} className="text-[var(--color-accent-400)]" strokeWidth={1.75} />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">{title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{description}</p>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[var(--color-accent-500)]/5 border border-[var(--color-accent-500)]/15">
                <Sparkles size={10} className="text-[var(--color-accent-400)] mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-[var(--text-muted)]">{tip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Prompt library ──────────────────────────────────────────────────── */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-black text-[var(--foreground)]">Prompt Library</h2>
          <div className="flex flex-wrap gap-1.5">
            {promptCategories.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  activeCategory === id
                    ? "bg-[var(--color-primary-500)] text-black"
                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
                )}
              >
                <Icon size={11} strokeWidth={1.75} />
                {title}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-2 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <activeGroup.icon size={16} className="text-[var(--color-primary-500)]" strokeWidth={1.75} />
              <div>
                <div className="text-sm font-semibold text-[var(--foreground)]">{activeGroup.title}</div>
                <div className="text-xs text-[var(--text-muted)]">{activeGroup.description}</div>
              </div>
            </div>

            <div className="space-y-2">
              {activeGroup.prompts.map((prompt, idx) => (
                <PromptCard
                  key={idx}
                  prompt={prompt}
                  isActive={openPrompts[activeCategory] === idx}
                  onToggle={() => togglePrompt(activeCategory, idx)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Do's and Don'ts ─────────────────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-xl font-black text-[var(--foreground)] mb-6">Do's and Don'ts</h2>
        <div className="space-y-6">
          {dosDonts.map(({ category, icon: Icon, items }) => (
            <div key={category} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[var(--border)] bg-[var(--elevated)]">
                <Icon size={15} className="text-[var(--color-primary-500)]" strokeWidth={1.75} />
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{category}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                {/* Do's */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-4">
                    <CheckCircle size={13} className="text-[var(--color-success)]" />
                    <span className="text-xs font-bold text-[var(--color-success)] uppercase tracking-wider">Do</span>
                  </div>
                  <div className="space-y-3">
                    {items.filter((i) => i.type === "do").map(({ text, code }) => (
                      <div key={text} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-[var(--foreground)]">{text}</div>
                          {code && <code className="text-[10px] font-mono text-[var(--color-secondary-400)] mt-0.5 block">{code}</code>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Don'ts */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-4">
                    <XCircle size={13} className="text-[var(--color-error)]" />
                    <span className="text-xs font-bold text-[var(--color-error)] uppercase tracking-wider">Don't</span>
                  </div>
                  <div className="space-y-3">
                    {items.filter((i) => i.type === "dont").map(({ text, code }) => (
                      <div key={text} className="flex items-start gap-2">
                        <XCircle size={12} className="text-[var(--color-error)] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-[var(--foreground)]">{text}</div>
                          {code && <code className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5 block line-through">{code}</code>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Branding restrictions ────────────────────────────────────────────── */}
      <section>
        <div className="p-6 rounded-2xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-[var(--color-warning)]" />
            <h2 className="text-base font-bold text-[var(--color-warning)]">Branding Restrictions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Never recolor the logo outside the brand palette",
              "Never apply drop shadows to the Schoolasium logo",
              "Never stretch or rotate the logo mark",
              "Never place the logo on low-contrast yellow surfaces",
              "Never combine the wordmark with a competing brand's typography",
              "Never generate AI images using the Schoolasium name or logo without approval",
            ].map((rule) => (
              <div key={rule} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <XCircle size={12} className="text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
                {rule}
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/20 text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--color-warning-dark)]">When in doubt, ask.</span>{" "}
            Send any AI-generated brand output to the design team for review before publishing.
          </div>
        </div>
      </section>
    </div>
  );
}
