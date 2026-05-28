import type { Config } from 'tailwindcss';

// ============================================================
//  Schoolasium Design System — Tailwind Config (TypeScript)
//  Version: 1.0.0 | May 2026
//  Usage: import config from './tailwind.config'
//         then add to your tailwind.config.ts: presets: [config]
// ============================================================

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],

  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // Brand: Primary (Yellow) ─────────────────────────────
        primary: {
          50:  '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308', // ★ Brand color — CTAs, logo, focused blocks
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          DEFAULT: '#EAB308',
        },

        // Brand: Secondary (Tech Cyan) ─────────────────────────
        secondary: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4', // ★ Links, live data, sensor readouts
          600: '#0891B2',
          700: '#0E7490',
          900: '#164E63',
          DEFAULT: '#06B6D4',
        },

        // Brand: Accent (Creator Violet) ───────────────────────
        accent: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6', // ★ Premium, AI, creative moments
          600: '#7C3AED',
          700: '#6D28D9',
          DEFAULT: '#8B5CF6',
        },

        // Neutrals (Slate) ────────────────────────────────────
        neutral: {
          0:   '#FFFFFF',
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1F2937',
          900: '#111827',
          950: '#0A0E1A',
        },

        // Semantic ─────────────────────────────────────────────
        success: {
          DEFAULT: '#22C55E',
          soft:    '#DCFCE7',
          dark:    '#16A34A',
        },
        warning: {
          DEFAULT: '#F59E0B',
          soft:    '#FEF3C7',
          dark:    '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          soft:    '#FEE2E2',
          dark:    '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          soft:    '#DBEAFE',
          dark:    '#2563EB',
        },

        // Dark theme surface aliases ────────────────────────────
        'dark-bg':       '#0A0E1A',
        'dark-surface':  '#111827',
        'dark-elevated': '#1F2937',
        'dark-border':   '#334155',
        'dark-hover':    '#2D3748',

        // Light theme surface aliases ──────────────────────────
        'light-bg':       '#FFFFFF',
        'light-surface':  '#F8FAFC',
        'light-elevated': '#F1F5F9',
        'light-border':   '#E2E8F0',
        'light-hover':    '#E2E8F0',
      },

      fontFamily: {
        primary:   ['"Roboto"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        secondary: ['"Open Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono:      ['"JetBrains Mono"', '"Fira Code"', '"Roboto Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['3rem',     { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-xl':  ['2.25rem',  { lineHeight: '1.2',  fontWeight: '700' }],
        'heading-lg':  ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-md':  ['1.5rem',   { lineHeight: '1.3',  fontWeight: '600' }],
        'heading-sm':  ['1.25rem',  { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.6' }],
        'body-md':     ['1rem',     { lineHeight: '1.55' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.5' }],
        'body-xs':     ['0.75rem',  { lineHeight: '1.45', fontWeight: '500' }],
        'code-md':     ['0.875rem', { lineHeight: '1.6', fontFamily: '"JetBrains Mono"' }],
        'code-sm':     ['0.8125rem',{ lineHeight: '1.55', fontFamily: '"JetBrains Mono"' }],
      },

      spacing: {
        '1':  '0.25rem',   // 4px
        '2':  '0.5rem',    // 8px
        '3':  '0.75rem',   // 12px
        '4':  '1rem',      // 16px
        '5':  '1.25rem',   // 20px
        '6':  '1.5rem',    // 24px
        '8':  '2rem',      // 32px
        '10': '2.5rem',    // 40px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
        '32': '8rem',      // 128px
      },

      borderRadius: {
        'none':  '0',
        'xs':    '2px',
        'sm':    '4px',
        'md':    '6px',
        'lg':    '8px',
        'xl':    '12px',
        '2xl':   '16px',
        '3xl':   '24px',
        'block': '10px',   // ★ Signature — visual programming blocks
        'full':  '9999px',
      },

      boxShadow: {
        // Light theme
        'xs':  '0 1px 2px rgba(15, 23, 42, 0.05)',
        'sm':  '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'md':  '0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.04)',
        'lg':  '0 10px 15px rgba(15, 23, 42, 0.08), 0 4px 6px rgba(15, 23, 42, 0.04)',
        'xl':  '0 20px 25px rgba(15, 23, 42, 0.10), 0 10px 10px rgba(15, 23, 42, 0.04)',
        '2xl': '0 25px 50px rgba(15, 23, 42, 0.16)',
        // Dark theme
        'dark-sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 30px rgba(0, 0, 0, 0.6)',
        // Brand glow
        'glow-primary':   '0 0 24px rgba(234, 179, 8, 0.35), 0 0 1px rgba(234, 179, 8, 0.8)',
        'glow-secondary': '0 0 24px rgba(6, 182, 212, 0.35), 0 0 1px rgba(6, 182, 212, 0.8)',
        'glow-accent':    '0 0 24px rgba(139, 92, 246, 0.35), 0 0 1px rgba(139, 92, 246, 0.8)',
        'glow-success':   '0 0 16px rgba(34, 197, 94, 0.35)',
        'glow-error':     '0 0 16px rgba(239, 68, 68, 0.35)',
      },

      transitionTimingFunction: {
        'out':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'decel':  'cubic-bezier(0, 0, 0.2, 1)',
      },

      transitionDuration: {
        'instant':    '80ms',
        'fast':       '150ms',
        'base':       '250ms',
        'slow':       '400ms',
        'slower':     '600ms',
        'deliberate': '900ms',
      },

      zIndex: {
        'base':          '0',
        'raised':        '10',
        'dropdown':      '1000',
        'sticky':        '1020',
        'fixed':         '1030',
        'modal-overlay': '1040',
        'modal':         '1050',
        'popover':       '1060',
        'toast':         '1070',
        'tooltip':       '1080',
      },

      screens: {
        'xs':  '480px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },

      maxWidth: {
        'container-sm':   '640px',
        'container-md':   '768px',
        'container-lg':   '1024px',
        'container-xl':   '1280px',
        'container-2xl':  '1536px',
      },
    },
  },

  plugins: [],
};

export default config;
