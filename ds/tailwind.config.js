/**
 * Schoolasium Design System — Tailwind v3 config
 * v1.0.0 · May 2026
 *
 * Drop this into your Tailwind project root and pair with
 * `colors_and_type.css` (loaded once in your global stylesheet).
 * Every value below maps 1:1 to a `var(--*)` token, so direct-class
 * usage and var() usage produce identical output.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          50:  '#FEFCE8', 100: '#FEF9C3', 200: '#FEF08A', 300: '#FDE047',
          400: '#FACC15', 500: '#EAB308', 600: '#CA8A04', 700: '#A16207',
          800: '#854D0E', 900: '#713F12',
          DEFAULT: '#EAB308',
        },
        secondary: {
          50:  '#ECFEFF', 100: '#CFFAFE', 300: '#67E8F9', 400: '#22D3EE',
          500: '#06B6D4', 600: '#0891B2', 700: '#0E7490', 900: '#164E63',
          DEFAULT: '#06B6D4',
        },
        accent: {
          300: '#C4B5FD', 400: '#A78BFA', 500: '#8B5CF6',
          600: '#7C3AED', 700: '#6D28D9',
          DEFAULT: '#8B5CF6',
        },
        neutral: {
          0:   '#FFFFFF', 50:  '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
          300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B', 600: '#475569',
          700: '#334155', 800: '#1F2937', 900: '#111827', 950: '#0A0E1A',
        },
        // Semantic
        success: { DEFAULT: '#22C55E', soft: '#DCFCE7', dark: '#16A34A' },
        warning: { DEFAULT: '#F59E0B', soft: '#FEF3C7', dark: '#D97706' },
        error:   { DEFAULT: '#EF4444', soft: '#FEE2E2', dark: '#DC2626' },
        info:    { DEFAULT: '#3B82F6', soft: '#DBEAFE', dark: '#2563EB' },
        // Surfaces (use these in app chrome)
        'dark-bg':       '#0A0E1A',
        'dark-surface':  '#111827',
        'dark-elevated': '#1F2937',
        'dark-border':   '#334155',
        'dark-hover':    '#2D3748',
        'light-bg':       '#FFFFFF',
        'light-surface':  '#F8FAFC',
        'light-elevated': '#F1F5F9',
        'light-border':   '#E2E8F0',
        'light-hover':    '#E2E8F0',
      },
      fontFamily: {
        sans:      ['Roboto', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        secondary: ['"Open Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono:      ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl':  ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg':  ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-md':  ['1.5rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm':  ['1.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':     ['1.125rem',{ lineHeight: '1.6'  }],
        'body-md':     ['1rem',    { lineHeight: '1.5'  }],
        'body-sm':     ['0.875rem',{ lineHeight: '1.5'  }],
        'body-xs':     ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        'code-md':     ['0.875rem',{ lineHeight: '1.6'  }],
        'code-sm':     ['0.8125rem',{ lineHeight: '1.6' }],
      },
      letterSpacing: {
        tight:  '-0.02em',
        snug:   '-0.01em',
        normal: '0',
        wide:   '0.025em',
        wider:  '0.08em',
      },
      spacing: {
        0: '0',   1: '0.25rem',  2: '0.5rem',  3: '0.75rem', 4: '1rem',
        5: '1.25rem', 6: '1.5rem', 8: '2rem',    10: '2.5rem', 12: '3rem',
        16: '4rem', 20: '5rem',   24: '6rem',   32: '8rem',
      },
      maxWidth: {
        'container-sm':  '640px',
        'container-md':  '768px',
        'container-lg':  '1024px',
        'container-xl':  '1280px',
        'container-2xl': '1536px',
      },
      borderRadius: {
        none:  '0',
        xs:    '2px',
        sm:    '4px',
        md:    '6px',
        lg:    '8px',
        xl:    '12px',
        '2xl': '16px',
        '3xl': '24px',
        block: '10px',     // signature block radius
        full:  '9999px',
      },
      boxShadow: {
        xs:  '0 1px 2px rgba(15, 23, 42, 0.05)',
        sm:  '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
        md:  '0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.04)',
        lg:  '0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.04)',
        xl:  '0 20px 25px rgba(15, 23, 42, 0.10), 0 10px 10px rgba(15, 23, 42, 0.04)',
        '2xl': '0 25px 50px rgba(15, 23, 42, 0.16)',
        'dark-sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 30px rgba(0, 0, 0, 0.6)',
        'glow-primary':   '0 0 24px rgba(234, 179, 8, 0.35), 0 0 1px rgba(234, 179, 8, 0.8)',
        'glow-secondary': '0 0 24px rgba(6, 182, 212, 0.35), 0 0 1px rgba(6, 182, 212, 0.8)',
        'glow-accent':    '0 0 24px rgba(139, 92, 246, 0.35), 0 0 1px rgba(139, 92, 246, 0.8)',
        'glow-success':   '0 0 16px rgba(34, 197, 94, 0.35)',
        'glow-error':     '0 0 16px rgba(239, 68, 68, 0.35)',
      },
      transitionTimingFunction: {
        out:    'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // block snap
        decel:  'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        instant: '80ms',
        fast:    '150ms',
        base:    '250ms',
        slow:    '400ms',
        slower:  '600ms',
        deliberate: '900ms',
      },
      zIndex: {
        base: '0', raised: '10', dropdown: '1000', sticky: '1020',
        fixed: '1030', 'modal-overlay': '1040', modal: '1050',
        popover: '1060', toast: '1070', tooltip: '1080',
      },
      backgroundImage: {
        'gradient-brand':  'linear-gradient(135deg, #EAB308, #CA8A04)',
        'gradient-dark':   'linear-gradient(180deg, #0A0E1A 0%, #111827 50%, #1F2937 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
