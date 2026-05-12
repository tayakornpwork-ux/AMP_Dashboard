# Project Structure — AMP Dashboard

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Font**: Noto Looped Thai (Regular, Medium, SemiBold, Bold, ExtraBold)

---

## Directory Structure

```
[AMP]-Dashboard/
├── docs/                           ← เอกสาร project (ไฟล์นี้, master-checklist)
├── public/
│   ├── fonts/                      ← self-hosted fonts (ถ้าไม่ใช้ Google Fonts)
│   ├── images/                     ← static images
│   └── icons/                      ← favicon, app icons
│
└── src/
    ├── app/                        ← Next.js App Router
    │   ├── (auth)/                 ← Route group: หน้า auth (ไม่มี dashboard layout)
    │   │   ├── layout.tsx          ← centered card layout
    │   │   └── login/
    │   │       └── page.tsx
    │   ├── (dashboard)/            ← Route group: หน้าหลัก (มี sidebar layout)
    │   │   ├── layout.tsx          ← sidebar + main content layout
    │   │   └── dashboard/
    │   │       └── page.tsx
    │   ├── api/                    ← Next.js API Routes
    │   ├── globals.css             ← Design tokens (CSS variables) + Tailwind base
    │   ├── layout.tsx              ← Root layout (font, metadata)
    │   ├── page.tsx                ← Root redirect / landing
    │   └── not-found.tsx           ← 404 page
    │
    ├── components/
    │   ├── ui/                     ← shadcn/ui base components (auto-generated via CLI)
    │   │                             คำสั่ง: npx shadcn@latest add <component>
    │   │                             ห้ามแก้ไขโดยตรง — ให้ extend ใน shared/ แทน
    │   ├── shared/                 ← Reusable cross-feature components
    │   │   ├── data-table/
    │   │   ├── page-header/
    │   │   ├── stat-card/
    │   │   └── ...
    │   └── features/               ← Feature-specific components (มี business logic)
    │       ├── auth/
    │       │   └── login-form.tsx
    │       ├── dashboard/
    │       └── ...
    │
    ├── lib/
    │   ├── fonts.ts                ← Font definitions (hoisted ที่ module level)
    │   └── utils.ts                ← cn() helper และ utility functions
    │
    ├── hooks/                      ← Custom React hooks
    │   └── use-debounce.ts
    │
    ├── actions/                    ← Server Actions (mutations, form submissions)
    │   └── README.md
    │
    ├── services/                   ← Server-side data fetching (ใช้ React.cache())
    │   └── README.md
    │
    ├── stores/                     ← Client global state (Zustand / Jotai)
    │   └── README.md
    │
    ├── config/
    │   ├── site.ts                 ← App name, URL, metadata
    │   └── nav.ts                  ← Navigation structure
    │
    ├── types/
    │   └── index.ts                ← Shared TypeScript types
    │
    ├── styles/                     ← CSS modules หรือ additional styles (ถ้าจำเป็น)
    └── assets/                     ← Images, SVGs ที่ import ใน code
```

---

## Storybook

Config อยู่ที่ root `.storybook/` — stories วางแบบ **co-located** กับ component

```
.storybook/
├── main.ts      ← framework, addons, stories glob
└── preview.ts   ← global decorators, import globals.css

src/components/shared/
└── button/
    ├── button.tsx
    ├── button.types.ts
    ├── button.stories.tsx   ← story file (co-located)
    └── button.md
```

### Commands
```bash
npm run storybook          # dev server → http://localhost:6006
npm run storybook:build    # static build → storybook-static/
```

### Story Convention

```tsx
// ชื่อ title ใช้ "Shared/<ComponentName>" หรือ "Features/<ComponentName>"
export default {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],   // auto-generate docs จาก props
} satisfies Meta<typeof Button>

// Story ชื่อ = variant ใน Figma
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
```

---

## Config Files (Root)

| ไฟล์ | หน้าที่ |
|---|---|
| `next.config.ts` | Next.js config (React Compiler, image formats) |
| `tsconfig.json` | TypeScript + path aliases (`@/*`) |
| `postcss.config.js` | Tailwind v4 PostCSS plugin |
| `components.json` | shadcn/ui config (alias, style, CSS variables) |
| `.eslintrc.json` | ESLint rules (Next.js + TypeScript) |
| `.prettierrc` | Prettier + prettier-plugin-tailwindcss |
| `.gitignore` | ไฟล์ที่ไม่ต้อง commit |
| `.env.example` | Template env vars |

---

## Path Aliases (tsconfig.json)

```ts
@/*              → src/*
@/components/*   → src/components/*
@/lib/*          → src/lib/*
@/hooks/*        → src/hooks/*
@/types/*        → src/types/*
@/config/*       → src/config/*
@/actions/*      → src/actions/*
@/services/*     → src/services/*
@/stores/*       → src/stores/*
@/styles/*       → src/styles/*
```

---

## Design Token Integration

Design tokens จาก Figma ถูก map เป็น CSS variables ใน `src/app/globals.css`
และ extend เข้า Tailwind ผ่าน `@theme inline`

ตัวอย่างการใช้ใน component:
```tsx
// ✅ ใช้ Tailwind class ที่ map กับ token
<div className="bg-background-default text-text-primary border-border-default">

// ✅ ใช้ CSS variable โดยตรง (กรณี arbitrary value)
<div style={{ color: "var(--color-brand-blue)" }}>
```

### Token Groups (ตรงกับ Figma Semantic variables)
| Group | Tailwind prefix | ตัวอย่าง |
|---|---|---|
| Background | `bg-background-*` | `bg-background-subtle` |
| Text | `text-text-*` | `text-text-primary` |
| Border | `border-border-*` | `border-border-default` |
| Brand Blue | `bg-brand-blue*` | `bg-brand-blue` |
| Brand Yellow | `bg-brand-yellow*` | `bg-brand-yellow` |
| Brand Red | `bg-brand-red*` | `bg-brand-red` |
| Status | `bg-status-*` | `bg-status-success-bg` |

---

## Component Architecture

```
shadcn/ui (ui/)           ← Base: Radix primitives + Tailwind
      ↓
shared/ components         ← Extended: เพิ่ม props, variants ตาม DSM
      ↓
features/ components       ← Business logic: fetch data, handle state
      ↓
app/ pages                 ← Compose: ประกอบ features เป็นหน้า
```

### กฎการ Import (bundle-barrel-imports)
```ts
// ✅ Import โดยตรง
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/shared/data-table/data-table"

// ❌ ห้าม re-export ผ่าน barrel index.ts
import { Button, DataTable } from "@/components"
```

---

## Server vs Client Components

| โฟลเดอร์ | Default | เหตุผล |
|---|---|---|
| `app/` pages | Server | Data fetching, SEO |
| `components/shared/` | Server | ไม่ต้องการ interactivity |
| `components/features/` | Server | เพิ่ม "use client" เฉพาะเมื่อจำเป็น |
| `components/ui/` | ตาม shadcn | มักเป็น Client (interactive) |
| `hooks/` | Client | ใช้ React hooks |
| `stores/` | Client | Global state |
| `services/` | Server | Data fetching เท่านั้น |
| `actions/` | Server | "use server" directive |

---

## Naming Conventions

| สิ่งที่ตั้งชื่อ | รูปแบบ | ตัวอย่าง |
|---|---|---|
| Component files | kebab-case | `data-table.tsx` |
| Component functions | PascalCase | `DataTable` |
| Hook files | kebab-case + use- prefix | `use-debounce.ts` |
| Type/Interface | PascalCase | `NavItem`, `ApiResponse` |
| Constants | SCREAMING_SNAKE | `API_BASE_URL` |
| CSS classes | Tailwind utilities | `bg-background-default` |
