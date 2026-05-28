# Schoolasium Design System

> *Where Kids Build the Future with Code*

The centralized design ecosystem for Schoolasium — production-ready components, semantic design tokens, brand assets, and AI-ready guidelines for building world-class EdTech experiences.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | MongoDB + Mongoose 9 |
| Auth | JWT (httpOnly cookie) + bcryptjs |
| State | Zustand (API-backed, no persist) |
| Search | Fuse.js (fuzzy, client-side) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, token preview, component showcase |
| `/tokens` | Interactive design token explorer (colors, type, spacing, radius, shadows, motion) |
| `/components` | Component library — live previews, code, props, accessibility notes |
| `/resources` | Asset hub — real file downloads, permission-gated previews |
| `/ai-guidelines` | Prompt templates, do/don'ts, AI workflows |
| `/guide` | User guide — getting started, dev guide, employee guide, branding rules |
| `/employee-portal` | JWT login → personal dashboard + activity |
| `/admin` | Admin panel — employee CRUD, RBAC, full activity log |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# MongoDB — no trailing slash before ?
MONGODB_URI=mongodb://127.0.0.1:27017/schoolasium_ds
# or Atlas:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/schoolasium_ds?retryWrites=true&w=majority

# Generate a strong secret:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-32-char-secret

SEED_SECRET=          # leave blank for local dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Important:** Never include a trailing `/` before `?` in the MongoDB URI — it causes a namespace parsing bug.

### 3. Start the dev server

```bash
npm run dev
```

### 4. Seed the database

```bash
# PowerShell
Invoke-RestMethod -Method POST `
  -Uri "http://localhost:3000/api/admin/seed" `
  -ContentType "application/json" `
  -Body "{}"

# or curl
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json" -d "{}"
```

### 5. Sign in

Go to **http://localhost:3000/employee-portal** and use the credentials returned by the seed endpoint.

---

## API Routes

All routes are under `/api/`. JWT is read from the `sds-token` httpOnly cookie.

```
POST /api/auth/signin              { email, password }
POST /api/auth/signout
GET  /api/auth/me

GET  /api/admin/employees          ?search &role &dept &status &page &limit
POST /api/admin/employees          { name, email, role, department, tempPassword }
PATCH /api/admin/employees/[id]    { role?, status?, department?, newPassword? }
DEL  /api/admin/employees/[id]     super_admin only

GET  /api/admin/activity           ?employeeId &type &page &limit
POST /api/activity                 { type, detail, resourceId? }

GET  /api/download/[resourceId]    permission-gated file download
POST /api/admin/seed               { force?: true }
```

---

## RBAC

| Role | Permissions |
|---|---|
| `super_admin` | Everything — create/delete accounts, all resources |
| `admin` | Create/disable accounts, view activity, manage resources |
| `employee` | Download all resources (public + internal) |
| `viewer` | Download public resources only |

---

## Project Structure

```
src/
├── proxy.ts                   # Next.js 16 route protection (JWT validation)
├── app/
│   ├── globals.css            # Design tokens + utility classes
│   ├── layout.tsx             # Root layout — fonts, metadata, ThemeProvider, AppShell
│   ├── page.tsx               # Landing page
│   ├── tokens/                # Token explorer
│   ├── components/            # Component library
│   ├── resources/             # Resource hub
│   ├── ai-guidelines/         # AI prompt library
│   ├── guide/                 # User guide
│   ├── employee-portal/       # Employee login + dashboard
│   ├── admin/                 # Admin dashboard
│   └── api/                   # All API routes
├── components/
│   ├── providers/             # ThemeProvider, AppShell
│   ├── layout/                # Navbar, Footer
│   ├── search/                # Command palette (⌘K)
│   ├── home/                  # Landing page sections
│   ├── tokens/                # Token page client
│   ├── components-page/       # Component docs client
│   ├── resources-page/        # Resources + download client
│   ├── ai-guidelines/         # AI guidelines client
│   ├── guide/                 # Guide client
│   ├── employee-portal/       # Portal login + dashboard
│   └── admin/                 # Admin dashboard
├── lib/
│   ├── db.ts                  # Mongoose connection (cached)
│   ├── auth.ts                # JWT + bcrypt utilities
│   ├── rbac.ts                # Role definitions + permission map
│   ├── resources.ts           # Resource registry
│   ├── utils.ts               # cn(), hex utilities
│   └── store/                 # Zustand stores (API-backed)
└── models/
    ├── Employee.ts            # Mongoose Employee schema
    └── Activity.ts            # Mongoose Activity schema (90-day TTL)

public/
├── favicon.ico / favicon-*.png
├── apple-touch-icon.png
├── android-chrome-*.png
├── site.webmanifest
├── logo.png                   # Horizontal logo (OG images)
├── logo-square.png            # Square mark (Navbar)
└── resources/                 # Downloadable assets
    ├── brand/                 # Logo PNGs
    ├── fonts/                 # TTF font files
    ├── tokens/                # CSS/SCSS/JSON/TS token files
    └── docs/                  # MASTER.md

src/resources/                 # Source assets (canonical copies)
```

---

## Design Tokens

120+ tokens across color, typography, spacing, radius, shadows, and motion.

Primary colors:

| Token | Value | Use |
|---|---|---|
| `--color-primary-500` | `#EAB308` | Brand yellow — CTAs, logo |
| `--color-secondary-500` | `#06B6D4` | Tech cyan — links, actions |
| `--color-accent-500` | `#8B5CF6` | Creator violet — AI, premium |

---

## License

Internal use only. © 2026 Schoolasium Design & Engineering.
