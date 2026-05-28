"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Package, Copy, Check, Bell, Star, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mini live previews
function ButtonsPreview() {
  return (
    <div className="space-y-3 p-5">
      <div className="text-xs font-mono text-[var(--text-muted)] mb-4">Button · all variants</div>
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-xs font-semibold hover:bg-[var(--color-primary-400)] transition-colors hover:shadow-[var(--shadow-glow-primary)]">
          Primary
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--elevated)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
          Secondary
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--color-accent-500)]/40 bg-[var(--color-accent-500)]/10 text-xs font-semibold text-[var(--color-accent-400)]">
          Accent
        </button>
        <button className="px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors">
          Ghost
        </button>
        <button className="px-4 py-2 rounded-lg border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 text-xs font-semibold text-[var(--color-error)] hover:bg-[var(--color-error)]/20 transition-colors">
          Danger
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="px-2.5 py-1 rounded-md bg-[var(--color-primary-500)] text-black text-[10px] font-semibold">sm</button>
        <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-black text-xs font-semibold">md</button>
        <button className="px-5 py-2.5 rounded-xl bg-[var(--color-primary-500)] text-black text-sm font-semibold">lg</button>
      </div>
    </div>
  );
}

function BadgesPreview() {
  const badges = [
    { label: "Primary",   bg: "bg-[var(--color-primary-500)]/15  text-[var(--color-primary-400)]  border-[var(--color-primary-500)]/30"  },
    { label: "Success",   bg: "bg-[var(--color-success)]/15      text-[var(--color-success-dark)] border-[var(--color-success)]/30"       },
    { label: "Warning",   bg: "bg-[var(--color-warning)]/15      text-[var(--color-warning-dark)] border-[var(--color-warning)]/30"       },
    { label: "Error",     bg: "bg-[var(--color-error)]/15        text-[var(--color-error-dark)]   border-[var(--color-error)]/30"         },
    { label: "Info",      bg: "bg-[var(--color-info)]/15         text-[var(--color-info-dark)]    border-[var(--color-info)]/30"          },
    { label: "Cyan",      bg: "bg-[var(--color-secondary-500)]/15 text-[var(--color-secondary-400)] border-[var(--color-secondary-500)]/30" },
    { label: "Violet",    bg: "bg-[var(--color-accent-500)]/15   text-[var(--color-accent-400)]   border-[var(--color-accent-500)]/30"    },
    { label: "Neutral",   bg: "bg-[var(--elevated)]              text-[var(--text-secondary)]     border-[var(--border)]"                 },
  ];
  return (
    <div className="p-5">
      <div className="text-xs font-mono text-[var(--text-muted)] mb-4">Badge · variants</div>
      <div className="flex flex-wrap gap-2">
        {badges.map(({ label, bg }) => (
          <span
            key={label}
            className={cn("inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border", bg)}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 text-[var(--color-success-dark)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
          Active
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 text-[var(--color-warning-dark)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)]" />
          Pending
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-[var(--border)] bg-[var(--elevated)] text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
          Inactive
        </span>
      </div>
    </div>
  );
}

function CardsPreview() {
  return (
    <div className="p-5 space-y-3">
      <div className="text-xs font-mono text-[var(--text-muted)] mb-2">Card · variants</div>
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--elevated)] hover:border-[var(--color-primary-500)]/40 transition-colors group">
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-500)]/15 flex items-center justify-center">
            <Zap size={14} className="text-[var(--color-primary-500)]" />
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 text-[var(--color-success-dark)]">Active</span>
        </div>
        <div className="text-sm font-semibold text-[var(--foreground)]">Workspace Card</div>
        <div className="text-xs text-[var(--text-muted)] mt-1">Interactive · hover to reveal</div>
      </div>
      <div className="p-4 rounded-xl border border-[var(--color-accent-500)]/30 bg-gradient-to-br from-[var(--color-accent-500)]/5 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <Star size={12} className="text-[var(--color-accent-400)]" />
          <span className="text-xs font-semibold text-[var(--color-accent-400)]">Premium</span>
        </div>
        <div className="text-sm font-semibold text-[var(--foreground)]">Analytics Card</div>
        <div className="text-2xl font-black text-[var(--foreground)] mt-1">12,430</div>
        <div className="text-xs text-[var(--color-success)] mt-1">↑ 14.2% this week</div>
      </div>
    </div>
  );
}

function NotificationsPreview() {
  const items = [
    { icon: Zap,  color: "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10", title: "New component released", time: "2m ago", dot: true },
    { icon: Bell, color: "text-[var(--color-info)] bg-[var(--color-info)]/10",               title: "Design token updated",    time: "1h ago", dot: false },
    { icon: Star, color: "text-[var(--color-accent-400)] bg-[var(--color-accent-500)]/10",   title: "v1.1.0 changelog ready", time: "3h ago", dot: false },
  ];
  return (
    <div className="p-5">
      <div className="text-xs font-mono text-[var(--text-muted)] mb-4">Notification Panel</div>
      <div className="space-y-2">
        {items.map(({ icon: Icon, color, title, time, dot }) => (
          <div key={title} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--elevated)] border border-[var(--border)] hover:bg-[var(--hover)] transition-colors cursor-default">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", color)}>
              <Icon size={14} strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[var(--foreground)] truncate">{title}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{time}</div>
            </div>
            {dot && <div className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = [
  { id: "buttons",       label: "Buttons",       preview: ButtonsPreview },
  { id: "badges",        label: "Badges",        preview: BadgesPreview },
  { id: "cards",         label: "Cards",         preview: CardsPreview },
  { id: "notifications", label: "Notifications", preview: NotificationsPreview },
];

const categories = [
  { name: "Basic",    count: 9,  items: ["Button", "Input", "Textarea", "Checkbox", "Radio", "Switch", "Badge", "Avatar", "Tooltip"] },
  { name: "Layout",   count: 8,  items: ["Card", "Modal", "Drawer", "Sidebar", "Tabs", "Accordion", "Table", "Navbar"] },
  { name: "Business", count: 10, items: ["Product Card", "Analytics Card", "Stats Card", "Pricing Card", "Dashboard Widget", "Empty State", "Team Card", "Notification", "Activity Feed", "User Profile"] },
  { name: "Advanced", count: 9,  items: ["Command Menu", "Data Table", "Kanban", "Calendar", "File Upload", "Rich Text Editor", "Charts", "Multi-step Form", "Search"] },
];

export function ComponentsShowcaseSection() {
  const [activeTab, setActiveTab] = useState("buttons");
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  const ActivePreview = tabs.find((t) => t.id === activeTab)?.preview ?? ButtonsPreview;

  return (
    <section className="py-24 px-4 sm:px-6 bg-[var(--background)]">
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
              <Package size={11} className="text-[var(--color-primary-500)]" />
              Component Ecosystem
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--foreground)]">
              40+ production-ready<br />
              <span className="text-gradient">components</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-2 max-w-md">
              From basic atoms to complex organisms — every component ships with live preview, code, and full docs.
            </p>
          </div>
          <Link
            href="/components"
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors group"
          >
            Browse all
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Category list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-2"
          >
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/components#${cat.name.toLowerCase()}`}
                className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--elevated)] hover:border-[var(--color-primary-500)]/30 transition-all duration-150 group"
              >
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{cat.name}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{cat.items.slice(0, 3).join(", ")}…</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--color-primary-400)] bg-[var(--color-primary-500)]/10 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                  <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors" />
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Interactive preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex border-b border-[var(--border)] bg-[var(--elevated)] overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-shrink-0 px-4 py-3 text-xs font-medium transition-colors duration-150 border-b-2 -mb-px",
                    activeTab === tab.id
                      ? "text-[var(--color-primary-500)] border-[var(--color-primary-500)]"
                      : "text-[var(--text-muted)] border-transparent hover:text-[var(--foreground)]",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Preview area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ActivePreview />
            </motion.div>

            {/* Footer */}
            <div className="border-t border-[var(--border)] px-5 py-3 flex items-center justify-between bg-[var(--elevated)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Live Preview · No iframe</span>
              <Link href="/components" className="text-[10px] font-medium text-[var(--color-primary-400)] hover:text-[var(--color-primary-300)]">
                View docs →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
