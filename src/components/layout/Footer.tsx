import Link from "next/link";
import { Zap, GitBranch, X, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-primary-500)] text-black font-black text-sm">
                S
              </div>
              <span className="font-bold text-[15px]">
                Schoolasium <span className="text-[var(--color-primary-500)]">DS</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[200px]">
              The design ecosystem for building world-class EdTech experiences.
            </p>
          </div>

          {/* Design */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">Design</h4>
            <ul className="space-y-2">
              {[
                { href: "/tokens", label: "Tokens" },
                { href: "/tokens#colors", label: "Colors" },
                { href: "/tokens#typography", label: "Typography" },
                { href: "/tokens#spacing", label: "Spacing" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Develop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">Develop</h4>
            <ul className="space-y-2">
              {[
                { href: "/components", label: "Components" },
                { href: "/components#buttons", label: "Buttons" },
                { href: "/components#forms", label: "Forms" },
                { href: "/resources", label: "Resources" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: "/ai-guidelines", label: "AI Guidelines" },
                { href: "/employee-portal", label: "Employee Portal" },
                { href: "/resources#brand", label: "Brand Assets" },
                { href: "/resources#icons", label: "Icon Pack" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            Made with <Heart size={12} className="text-[var(--color-error)]" fill="currentColor" /> by Schoolasium Design &amp; Engineering · v1.0.0
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
              <GitBranch size={16} />
            </a>
            <a href="#" aria-label="X / Twitter" className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">
              <X size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
