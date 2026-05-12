## Checklist: Master Plan for Design System & Web Project

### Phase 1: Design System & QA (Figma) ✅
- [x] สร้าง Design System ใน Figma (Color, Typography, Spacing, Components, States, Tokens)
  - [x] Color Primitives — 62 tokens (brand-blue, brand-yellow, brand-red, slate, green, orange, white, black × 10 shades)
  - [x] Semantic tokens — 63 tokens (background, text, border, brand, status) ทุกตัว alias กับ Primitives
  - [x] Typography — 34 text styles (ทุก style มี prefix: heading/, body/, ui/, data/) ไม่มี legacy
  - [x] Font — Noto Looped Thai ทั้งหมด (Regular, Medium, SemiBold, Bold, ExtraBold)
  - [x] Token Architecture — 3 layers: Primitives → Semantic → Component
  - [x] Components (18 component sets):
    - [x] button — 30 variants (11 types × Default/hover/disabled)
    - [x] input — 13 variants (2 sizes × 4 states × 2 types)
    - [x] textarea — 4 variants (2 types × Default/disabled)
    - [x] checkbox — 5 variants (default, with text, checked, checked with text, disabled)
    - [x] radio button — 3 variants (default, selected, disabled)
    - [x] switch — 3 variants (off, on, disabled)
    - [x] tab item — 3 variants (selected, unselected, disabled)
    - [x] accordion Item — 3 variants (open, closed, disabled)
    - [x] avatar — 2 variants (initials, image)
    - [x] table item — 3 variants (head, item default, item selected)
    - [x] menu item — 4 variants
    - [x] navigation menu — 4+ variants
    - [x] collapsible — 2 variants
    - [x] section items, menubar, poster, scroll list item, inline code
    - [x] card — 2 compositions (with/without cancel button via showCancel boolean property)
    - [x] toast — 4 variants (default, success, warning, destructive)
    - [x] dialog — 2 variants (default, destructive)
  - [x] Color bindings — Components page: 0 hardcoded / Primitives page: 0 hardcoded (ยกเว้น palette display)
  - [x] Text style bindings — Primitives: 100% / Components: 100%
  - [x] Disabled button ใช้ Option B (muted brand colors แทนสีเทา)
  - [x] Icons — 877 Lucide icons (hardcoded by design)
- [x] จัดทำ QA Checklist และ Audit ตรวจสอบความครบถ้วนของ Design System
  - [x] Hardcoded color audit
  - [x] Font consistency audit
  - [x] Variant completeness audit
  - [x] Token architecture audit
- [ ] ให้ทีม QA ตรวจสอบและ Feedback จนกว่าจะครบถ้วน

#### Missing Components (nice-to-have ก่อนขึ้น Screen จริง)
- [ ] stat-card / KPI card
- [ ] data-table (full)
- [ ] alert / banner
- [ ] breadcrumb
- [ ] pagination
- [ ] skeleton
- [ ] empty-state

---

### Phase 2: Project Setup ✅
- [x] สร้างโปรเจกต์ Next.js 15 (App Router) + Tailwind CSS v4 + shadcn/ui
- [x] วางโครงสร้างไฟล์ตาม project-structure.md (app/, components/shared/, features/, lib/, hooks/, actions/, services/, stores/, config/, types/)
- [x] ตั้งค่า Lint (ESLint), Prettier + prettier-plugin-tailwindcss, tsconfig path aliases (@/*)
- [x] ตั้งค่า Storybook (Vite builder, co-located stories, globals.css import)
- [x] Design tokens map เป็น CSS variables ใน globals.css + extend เข้า Tailwind via @theme inline
- [ ] CI/CD pipeline (ยังไม่ได้ตั้งค่า)

---

### Phase 3: Components API & Documentation ✅
- [x] ออกแบบ Components API workflow (Figma-first, CVA variants, forwardRef, asChild, cn() merge)
- [x] จัดทำ component-api-plan.md เป็น source of truth สำหรับ workflow และ checklist
- [x] สร้าง Components ครบ 12 ตัวใน src/components/shared/:

| Component | Figma | Types | Code | Docs | Stories |
|---|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ | ✅ |
| Textarea | ✅ | ✅ | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ | ✅ | ✅ |
| Radio | ✅ | ✅ | ✅ | ✅ | ✅ |
| Switch | ✅ | ✅ | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ | ✅ |
| Avatar | ✅ | ✅ | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dialog | ✅ | ✅ | ✅ | ✅ | ✅ |

- [x] ทุก component ผ่าน checklist: forwardRef, asChild, className+cn(), export variants, spread HTML props, token only (ห้าม hardcode)
- [x] ทุก component มีไฟล์ .md (Figma ref, Props table, Usage, Notes)
- [x] Storybook stories ครบทุก component (Default + All variants + edge cases)

---

### Phase 4: Design Spec
- [ ] สร้าง Design Spec สำหรับแต่ละ Screen (layout, component placement, states, responsive)
- [ ] จัดทำเอกสาร Design Spec ให้ทีม Dev/QA ใช้อ้างอิง

---

### Phase 5: Screen Implementation
- [ ] **Login page** — ประกอบ LoginForm จาก Input + Button + Checkbox
- [ ] **Dashboard page** — ประกอบ stat-cards + data-table + charts
- [ ] หน้าอื่นๆ ตาม scope ที่กำหนด
- [ ] ทดสอบการใช้งานจริง (Integration Test, Manual QA)
- [ ] ปรับปรุง Components/Screens ตาม Feedback
