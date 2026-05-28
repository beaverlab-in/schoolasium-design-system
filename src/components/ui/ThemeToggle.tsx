"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark",  label: "Dark",  icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const Icon = resolvedTheme === "light" ? Sun : Moon;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle theme"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
          "border border-[var(--border)] bg-[var(--surface)]",
          "text-[var(--text-secondary)] hover:text-[var(--foreground)]",
          "hover:bg-[var(--hover)] transition-all duration-150",
        )}
      >
        <Icon size={15} strokeWidth={1.75} />
        <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      {open && (
        <div className={cn(
          "absolute right-0 top-full mt-2 w-36 py-1 z-[1060]",
          "rounded-xl border border-[var(--border)] bg-[var(--elevated)]",
          "shadow-[var(--shadow-dark-lg)]",
          "animate-scale-in origin-top-right",
        )}>
          {options.map(({ value, label, icon: ItemIcon }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); setOpen(false); }}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-2 text-sm",
                "transition-colors duration-100 hover:bg-[var(--hover)]",
                theme === value
                  ? "text-[var(--color-primary-500)] font-medium"
                  : "text-[var(--text-secondary)]",
              )}
            >
              <ItemIcon size={14} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
