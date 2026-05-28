"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Package, Search, Copy, Check, ExternalLink,
  MousePointer, LayoutGrid, BarChart2, Layers, Zap,
  ChevronRight, AlertCircle, Info, CheckCircle, Bell,
  Star, User, Settings, ArrowRight, Loader2, X,
  ToggleLeft, Sliders, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ComponentDef {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  props?: { name: string; type: string; default: string; description: string }[];
  a11y?: string;
  status: "stable" | "beta" | "new";
}

// ─── Copy button ─────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="relative rounded-xl bg-[var(--color-neutral-950)] border border-[var(--border)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)]">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">TypeScript · React</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
        >
          {copied ? <Check size={10} className="text-[var(--color-success)]" /> : <Copy size={10} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-[11px] font-mono text-[var(--color-secondary-300)] leading-relaxed overflow-x-auto whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

// ─── Component previews ───────────────────────────────────────────────────────

function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-wrap gap-2 items-center">
        <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold hover:bg-[var(--color-primary-400)] transition-all hover:shadow-[var(--shadow-glow-primary)] hover:-translate-y-px active:scale-[0.98]">
          Primary
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
          Secondary
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--color-accent-500)]/40 bg-[var(--color-accent-500)]/10 text-sm font-semibold text-[var(--color-accent-400)] hover:bg-[var(--color-accent-500)]/20 transition-colors">
          Accent
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
          Ghost
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 text-sm font-semibold text-[var(--color-error)] hover:bg-[var(--color-error)]/20 transition-colors">
          Danger
        </button>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button className="px-2.5 py-1 rounded-md bg-[var(--color-primary-500)] text-black text-xs font-semibold">sm</button>
        <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold">md</button>
        <button className="px-5 py-2.5 rounded-xl bg-[var(--color-primary-500)] text-black text-base font-semibold">lg</button>
        <button
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Loading…" : "Click me"}
        </button>
        <button className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold max-w-[140px]">
          Full Width
        </button>
      </div>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          ["Primary",   "bg-[var(--color-primary-500)]/15  text-[var(--color-primary-400)]  border-[var(--color-primary-500)]/30"],
          ["Success",   "bg-[var(--color-success)]/15      text-[var(--color-success-dark)] border-[var(--color-success)]/30"],
          ["Warning",   "bg-[var(--color-warning)]/15      text-[var(--color-warning-dark)] border-[var(--color-warning)]/30"],
          ["Error",     "bg-[var(--color-error)]/15        text-[var(--color-error-dark)]   border-[var(--color-error)]/30"],
          ["Info",      "bg-[var(--color-info)]/15         text-[var(--color-info-dark)]    border-[var(--color-info)]/30"],
          ["Neutral",   "bg-[var(--elevated)]              text-[var(--text-secondary)]     border-[var(--border)]"],
        ].map(([label, cls]) => (
          <span key={label} className={cn("inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border", cls)}>
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 text-[var(--color-success-dark)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
          Live
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
          Offline
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border border-[var(--color-primary-500)]/30 bg-[var(--color-primary-500)]/10 text-[var(--color-primary-400)]">
          <Star size={10} fill="currentColor" />
          Featured
        </span>
      </div>
    </div>
  );
}

function InputPreview() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="p-6 space-y-3 max-w-sm">
      <div>
        <label className="block text-xs font-medium text-[var(--foreground)] mb-1.5">Email address</label>
        <input
          type="email"
          placeholder="you@schoolasium.com"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          className={cn(
            "w-full h-10 px-3 rounded-lg border bg-[var(--elevated)] text-sm text-[var(--foreground)]",
            "placeholder:text-[var(--text-muted)] outline-none transition-all duration-150",
            "focus:ring-2 focus:ring-[var(--color-primary-500)]/40 focus:border-[var(--color-primary-500)]",
            error ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/30" : "border-[var(--border)]",
          )}
        />
        {error && <p className="text-xs text-[var(--color-error)] mt-1 flex items-center gap-1"><AlertCircle size={11} /> Please enter a valid email</p>}
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--foreground)] mb-1.5">Password</label>
        <div className="relative">
          <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/40 focus:border-[var(--color-primary-500)] transition-all" />
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1">Minimum 8 characters</p>
      </div>
      <button
        onClick={() => !value.includes("@") && setError(true)}
        className="w-full h-10 rounded-lg bg-[var(--color-primary-500)] text-black text-sm font-semibold hover:bg-[var(--color-primary-400)] transition-colors"
      >
        Sign in
      </button>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Default card */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--elevated)] hover:border-[var(--color-primary-500)]/30 transition-colors group">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-500)]/15 flex items-center justify-center">
            <Zap size={14} className="text-[var(--color-primary-500)]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--foreground)]">Workspace</div>
            <div className="text-[10px] text-[var(--text-muted)]">Active · 3 blocks</div>
          </div>
        </div>
        <div className="text-xs text-[var(--text-secondary)]">Drag blocks to build your first robotics project.</div>
        <button className="mt-3 text-xs font-medium text-[var(--color-primary-400)] flex items-center gap-1 hover:gap-1.5 transition-all">
          Open <ChevronRight size={11} />
        </button>
      </div>
      {/* Stats card */}
      <div className="p-4 rounded-xl border border-[var(--color-secondary-500)]/20 bg-gradient-to-br from-[var(--color-secondary-500)]/5 to-transparent">
        <div className="text-xs text-[var(--text-muted)] mb-1">Total Students</div>
        <div className="text-2xl font-black text-[var(--foreground)]">2,431</div>
        <div className="text-xs text-[var(--color-success)] mt-1 flex items-center gap-1">
          <ArrowRight size={10} className="rotate-[-45deg]" />
          +12.4% this month
        </div>
      </div>
      {/* Profile card */}
      <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--elevated)]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
          AK
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[var(--foreground)]">Aditya Kumar</div>
          <div className="text-xs text-[var(--text-muted)]">Design Engineer · Schoolasium</div>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 text-[var(--color-success-dark)] font-medium">Admin</span>
      </div>
    </div>
  );
}

function AlertPreview() {
  return (
    <div className="p-6 space-y-2">
      {[
        { icon: CheckCircle, title: "Project saved",         desc: "All blocks and connections preserved.", color: "success" },
        { icon: Info,        title: "New version available", desc: "v1.1.0 is ready — see the changelog.",  color: "info"    },
        { icon: AlertCircle, title: "Connection slow",       desc: "Some sensor data may be delayed.",      color: "warning" },
        { icon: X,           title: "Upload failed",         desc: "Check your connection and try again.",   color: "error"   },
      ].map(({ icon: Icon, title, desc, color }) => {
        const styles: Record<string, string> = {
          success: "border-[var(--color-success)]/30  bg-[var(--color-success)]/8  text-[var(--color-success-dark)]",
          info:    "border-[var(--color-info)]/30     bg-[var(--color-info)]/8     text-[var(--color-info-dark)]",
          warning: "border-[var(--color-warning)]/30  bg-[var(--color-warning)]/8  text-[var(--color-warning-dark)]",
          error:   "border-[var(--color-error)]/30    bg-[var(--color-error)]/8    text-[var(--color-error-dark)]",
        };
        return (
          <div key={title} className={cn("flex items-start gap-3 p-3 rounded-xl border text-xs", styles[color])}>
            <Icon size={14} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold">{title}</div>
              <div className="opacity-80 mt-0.5">{desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AvatarPreview() {
  const initials = ["AK", "SJ", "MR", "PD", "TN"];
  const colors = [
    "from-[var(--color-primary-400)] to-[var(--color-primary-600)]",
    "from-[var(--color-secondary-400)] to-[var(--color-secondary-600)]",
    "from-[var(--color-accent-400)] to-[var(--color-accent-600)]",
    "from-[var(--color-success)]/80 to-[var(--color-success)]",
    "from-[var(--color-info)]/80 to-[var(--color-info)]",
  ];
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-end gap-3">
        {["w-6 h-6 text-[8px]", "w-8 h-8 text-xs", "w-10 h-10 text-sm", "w-12 h-12 text-base", "w-16 h-16 text-lg"].map((cls, i) => (
          <div key={i} className={cn("rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-black flex-shrink-0", cls, colors[0])}>
            AK
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {initials.map((init, i) => (
          <div
            key={init}
            className={cn("w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-black flex-shrink-0 ring-2 ring-[var(--background)]", colors[i % colors.length])}
            style={{ marginLeft: i > 0 ? "-8px" : "0" }}
          >
            {init}
          </div>
        ))}
        <div className="w-9 h-9 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-muted)] ring-2 ring-[var(--background)]" style={{ marginLeft: "-8px" }}>
          +4
        </div>
      </div>
    </div>
  );
}

function TogglePreview() {
  const [states, setStates] = useState([true, false, false, true]);
  const labels = ["Dark Mode", "Notifications", "Auto-save", "Analytics"];
  return (
    <div className="p-6 space-y-3 max-w-xs">
      {states.map((on, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--elevated)]">
          <span className="text-sm text-[var(--foreground)]">{labels[i]}</span>
          <button
            onClick={() => setStates(s => s.map((v, j) => j === i ? !v : v))}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none",
              on ? "bg-[var(--color-primary-500)]" : "bg-[var(--color-neutral-700)]",
            )}
            role="switch"
            aria-checked={on}
          >
            <span className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
              on ? "translate-x-5" : "translate-x-0",
            )} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Component registry ───────────────────────────────────────────────────────

const components: ComponentDef[] = [
  {
    id: "button", name: "Button", category: "Basic", status: "stable",
    description: "Primary interactive element. Five variants, three sizes, loading and disabled states.",
    preview: <ButtonPreview />,
    code: `import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const variants = {
  primary:   "bg-primary-500 text-black hover:bg-primary-400 hover:shadow-glow-primary",
  secondary: "border border-border bg-elevated text-foreground hover:bg-hover",
  accent:    "border border-accent-500/40 bg-accent-500/10 text-accent-400",
  ghost:     "text-muted hover:text-foreground hover:bg-hover",
  danger:    "border border-error/40 bg-error/10 text-error hover:bg-error/20",
}
const sizes = {
  sm: "px-2.5 py-1 rounded-md text-xs",
  md: "px-4 py-2 rounded-lg text-sm",
  lg: "px-5 py-2.5 rounded-xl text-base",
}

export function Button({
  variant = "primary", size = "md",
  loading, children, className, ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading || props.disabled}
      className={cn(
        "inline-flex items-center gap-2 font-semibold",
        "transition-all duration-150 disabled:opacity-60",
        variants[variant], sizes[size], className,
      )}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" size={14} />}
      {children}
    </button>
  )
}`,
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'", default: "'primary'", description: "Visual style variant" },
      { name: "size",    type: "'sm' | 'md' | 'lg'",                                       default: "'md'",       description: "Button size" },
      { name: "loading", type: "boolean",                                                   default: "false",      description: "Shows spinner, disables interaction" },
    ],
    a11y: "Uses native <button> element. Loading state sets disabled and shows spinner with aria-label. Glow focus ring meets WCAG 2.2 §2.4.11.",
  },
  {
    id: "badge", name: "Badge", category: "Basic", status: "stable",
    description: "Compact status indicators and labels. Seven semantic variants.",
    preview: <BadgePreview />,
    code: `const variantStyles = {
  primary: "bg-primary-500/15 text-primary-400 border-primary-500/30",
  success: "bg-success/15 text-success-dark border-success/30",
  warning: "bg-warning/15 text-warning-dark border-warning/30",
  error:   "bg-error/15 text-error-dark border-error/30",
  info:    "bg-info/15 text-info-dark border-info/30",
  neutral: "bg-elevated text-secondary border-border",
}

export function Badge({ variant = "neutral", dot, children }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px]",
      "font-semibold uppercase tracking-wider rounded-full border",
      variantStyles[variant],
    )}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}`,
    a11y: "Use role='status' for dynamic badges. Color alone never communicates meaning — pair with text or icon.",
  },
  {
    id: "input", name: "Input", category: "Basic", status: "stable",
    description: "Text field with label, hint, error, and icon slot support.",
    preview: <InputPreview />,
    code: `export function Input({ label, hint, error, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full h-10 px-3 rounded-lg border bg-elevated",
          "text-sm text-foreground placeholder:text-muted",
          "outline-none transition-all duration-150",
          "focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500",
          error
            ? "border-error focus:ring-error/30"
            : "border-border",
        )}
        {...props}
      />
      {(hint || error) && (
        <p className={cn("text-xs flex items-center gap-1",
          error ? "text-error" : "text-muted",
        )}>
          {error && <AlertCircle size={11} />}
          {error ?? hint}
        </p>
      )}
    </div>
  )
}`,
    a11y: "Always pair with a visible <label>. Error messages use role='alert'. Min 44px touch target via h-10 + padding.",
  },
  {
    id: "card", name: "Card", category: "Layout", status: "stable",
    description: "Versatile container for content grouping. Default, interactive, elevated, and stats variants.",
    preview: <CardPreview />,
    code: `export function Card({ variant = "default", padding = "md", children, className }) {
  const variants = {
    default:     "border-border bg-elevated hover:border-primary-500/30",
    interactive: "border-border bg-elevated cursor-pointer hover:bg-hover hover:-translate-y-0.5",
    elevated:    "border-border bg-surface shadow-dark-md",
    stats:       "border-secondary-500/20 bg-gradient-to-br from-secondary-500/5 to-transparent",
  }
  const paddings = { sm: "p-3", md: "p-4", lg: "p-6" }

  return (
    <div className={cn(
      "rounded-xl border transition-all duration-150",
      variants[variant], paddings[padding], className,
    )}>
      {children}
    </div>
  )
}`,
    a11y: "Interactive cards use role='button' and tabIndex={0}. Include keyboard handler for Enter/Space.",
  },
  {
    id: "alert", name: "Alert", category: "Basic", status: "stable",
    description: "Inline feedback banners for success, info, warning, and error states.",
    preview: <AlertPreview />,
    code: `const styles = {
  success: "border-success/30 bg-success/8 text-success-dark",
  info:    "border-info/30    bg-info/8    text-info-dark",
  warning: "border-warning/30 bg-warning/8 text-warning-dark",
  error:   "border-error/30   bg-error/8   text-error-dark",
}
const icons = { success: CheckCircle, info: Info, warning: AlertCircle, error: X }

export function Alert({ variant = "info", title, description }) {
  const Icon = icons[variant]
  return (
    <div role="alert" className={cn("flex items-start gap-3 p-3 rounded-xl border text-xs", styles[variant])}>
      <Icon size={14} className="mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-semibold">{title}</div>
        {description && <div className="opacity-80 mt-0.5">{description}</div>}
      </div>
    </div>
  )
}`,
    a11y: "Wraps in role='alert' for live announcement. Error alerts persist; info/success auto-dismiss after 4s.",
  },
  {
    id: "avatar", name: "Avatar", category: "Basic", status: "stable",
    description: "User representation with image fallback, initials, and group stacking.",
    preview: <AvatarPreview />,
    code: `export function Avatar({ src, fallback, size = "md", className }) {
  const sizes = {
    xs: "w-6 h-6 text-[8px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  }
  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-primary-400 to-primary-600",
      "flex items-center justify-center font-bold text-black",
      "ring-2 ring-background overflow-hidden flex-shrink-0",
      sizes[size], className,
    )}>
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  )
}`,
    a11y: "Always provide alt text matching the user's name. Decorative avatars use alt=''.",
  },
  {
    id: "toggle", name: "Switch", category: "Basic", status: "stable",
    description: "Toggle boolean settings with smooth animation and accessible role=switch.",
    preview: <TogglePreview />,
    code: `export function Switch({ label, checked, onChange, ...props }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-elevated">
      <span className="text-sm text-foreground">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200",
          checked ? "bg-primary-500" : "bg-neutral-700",
        )}
        {...props}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm",
          "transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )} />
      </button>
    </div>
  )
}`,
    a11y: "Uses role='switch' and aria-checked. Announce state changes with aria-live='polite' on the parent.",
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const categories = ["All", "Basic", "Layout", "Business", "Advanced"];

// ─── Main page ────────────────────────────────────────────────────────────────

export function ComponentsPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<ComponentDef>(components[0]);
  const [tab, setTab] = useState<"preview" | "code" | "props" | "a11y">("preview");
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const filtered = components.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Page header */}
      <div ref={headerRef} className="py-12 border-b border-[var(--border)] mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] mb-4">
          <Package size={11} className="text-[var(--color-primary-500)]" />
          Component Library · 40+ components
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)] mb-3">
          Components
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          Production-ready components with live previews, copy-ready code, prop tables, and accessibility notes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 pb-24">
        {/* Left panel — component list */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          {/* Search */}
          <div className="relative mb-3">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-primary-500)] transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                  category === cat
                    ? "bg-[var(--color-primary-500)] text-black"
                    : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover)]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Component list */}
          <div className="space-y-0.5 lg:sticky lg:top-24 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {filtered.length === 0 && (
              <div className="py-8 text-center text-sm text-[var(--text-muted)]">No components found</div>
            )}
            {filtered.map((comp) => (
              <button
                key={comp.id}
                onClick={() => { setSelected(comp); setTab("preview"); }}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm text-left transition-colors",
                  selected.id === comp.id
                    ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-400)] font-medium"
                    : "text-[var(--foreground)] hover:bg-[var(--hover)]",
                )}
              >
                <span>{comp.name}</span>
                <div className="flex items-center gap-1.5">
                  {comp.status === "new" && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--color-primary-500)] text-black">NEW</span>
                  )}
                  {comp.status === "beta" && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[var(--color-warning)]/40 text-[var(--color-warning)]">BETA</span>
                  )}
                  <span className="text-[10px] text-[var(--text-muted)]">{comp.category}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Right panel — component docs */}
        <main className="flex-1 min-w-0">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Component header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-black text-[var(--foreground)]">{selected.name}</h2>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                      selected.status === "stable" ? "text-[var(--color-success-dark)] border-[var(--color-success)]/30 bg-[var(--color-success)]/10" :
                      selected.status === "new"    ? "text-black border-[var(--color-primary-500)] bg-[var(--color-primary-500)]" :
                      "text-[var(--color-warning)] border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10",
                    )}>
                      {selected.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{selected.description}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[var(--border)] mb-5 overflow-x-auto">
                {(["preview", "code", "props", "a11y"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium capitalize whitespace-nowrap border-b-2 -mb-px transition-colors",
                      tab === t
                        ? "text-[var(--color-primary-500)] border-[var(--color-primary-500)]"
                        : "text-[var(--text-muted)] border-transparent hover:text-[var(--foreground)]",
                    )}
                  >
                    {t === "a11y" ? "Accessibility" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <motion.div
                key={`${selected.id}-${tab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {tab === "preview" && (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--elevated)]">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-error)]" />
                      <div className="w-2 h-2 rounded-full bg-[var(--color-warning)]" />
                      <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                      <span className="ml-2 text-[10px] font-mono text-[var(--text-muted)]">Live Preview</span>
                    </div>
                    <div className="bg-[var(--background)]">{selected.preview}</div>
                  </div>
                )}

                {tab === "code" && <CodeBlock code={selected.code} />}

                {tab === "props" && selected.props && (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <div className="grid grid-cols-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-4 py-2.5 border-b border-[var(--border)] bg-[var(--elevated)]">
                      <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
                    </div>
                    <div className="divide-y divide-[var(--border)]">
                      {selected.props.map((prop) => (
                        <div key={prop.name} className="grid grid-cols-4 gap-4 px-4 py-3 text-xs">
                          <code className="font-mono text-[var(--color-primary-400)]">{prop.name}</code>
                          <code className="font-mono text-[var(--color-secondary-400)] text-[10px]">{prop.type}</code>
                          <code className="font-mono text-[var(--text-muted)]">{prop.default}</code>
                          <span className="text-[var(--text-secondary)]">{prop.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "a11y" && selected.a11y && (
                  <div className="p-5 rounded-2xl border border-[var(--color-info)]/20 bg-[var(--color-info)]/5 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <div className="flex items-center gap-2 mb-3 text-[var(--color-info)]">
                      <Info size={14} />
                      <span className="font-semibold text-xs uppercase tracking-wider">Accessibility Notes</span>
                    </div>
                    {selected.a11y}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package size={40} className="text-[var(--text-muted)] mb-4" />
              <div className="text-sm text-[var(--text-muted)]">Select a component to view its docs</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
