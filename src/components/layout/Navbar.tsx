"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers, Palette, Package, FolderOpen, Bot, Users,
  Search, Menu, X, ChevronRight, Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/",               label: "Home",       icon: Zap },
  { href: "/tokens",         label: "Tokens",     icon: Palette },
  { href: "/components",     label: "Components", icon: Package },
  { href: "/resources",      label: "Resources",  icon: FolderOpen },
  { href: "/ai-guidelines",  label: "AI Guide",   icon: Bot },
  { href: "/employee-portal",label: "Portal",     icon: Users },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[1030]",
        "transition-all duration-300",
        scrolled
          ? "glass border-b border-[var(--border)] shadow-[var(--shadow-dark-md)]"
          : "bg-transparent",
      )}>
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "bg-[var(--color-primary-500)] text-black font-black text-sm",
              "transition-all duration-150 group-hover:shadow-[var(--shadow-glow-primary)]",
            )}>
              S
            </div>
            <span className="font-bold text-[15px] tracking-tight text-[var(--foreground)] hidden sm:block">
              Schoolasium
              <span className="text-[var(--color-primary-500)]"> DS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 ml-4">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
                    "transition-all duration-150",
                    active
                      ? "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover)]",
                  )}
                >
                  <Icon size={14} strokeWidth={1.75} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex-1 lg:hidden" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm",
                "border border-[var(--border)] bg-[var(--surface)]",
                "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                "transition-colors duration-150 cursor-pointer",
              )}
            >
              <Search size={14} strokeWidth={1.75} />
              <span className="text-xs">Search...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-[var(--elevated)] rounded border border-[var(--border)]">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
            <Link
              href="/employee-portal"
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
                "bg-[var(--color-primary-500)] text-black",
                "hover:bg-[var(--color-primary-400)] transition-colors duration-150",
              )}
            >
              <Users size={14} strokeWidth={2} />
              <span>Portal</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg",
                "text-[var(--text-secondary)] hover:text-[var(--foreground)]",
                "hover:bg-[var(--hover)] transition-colors duration-150",
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed top-16 left-0 right-0 z-[1025]",
              "glass border-b border-[var(--border)]",
              "shadow-[var(--shadow-dark-lg)] lg:hidden",
            )}
          >
            <nav className="max-w-[1280px] mx-auto px-4 py-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg",
                      "transition-colors duration-150",
                      active
                        ? "text-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10"
                        : "text-[var(--foreground)] hover:bg-[var(--hover)]",
                    )}
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <Icon size={16} strokeWidth={1.75} />
                      {label}
                    </span>
                    <ChevronRight size={14} className="text-[var(--text-muted)]" />
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
