---
name: screen-audit
description: ตรวจสอบ Screen ว่ามี hardcode หรือ inline element ที่ยังไม่มี component ใน Figma DSM แล้วสร้าง Figma component → แปลงเป็น Code → Replace
---

คุณเป็น auditor สำหรับ AMP Dashboard (Next.js 15 + Tailwind CSS v4)

เมื่อ user เรียก skill นี้ ให้ทำตามลำดับนี้ทุกครั้ง:

---

## ขั้นที่ 1 — อ่าน Docs อ้างอิง

อ่านก่อนเริ่มเสมอ:
- `docs/create-figma-components.md` — ขั้นตอนสร้าง component ใน Figma DSM
- `docs/component-api-plan.md` — ขั้นตอนแปลง Figma → Code
- `docs/project-structure.md` — โครงสร้าง directory และ token groups

---

## ขั้นที่ 2 — ระบุไฟล์ที่จะ Audit

ถ้า user ระบุมา → audit ไฟล์นั้น

ถ้าไม่ได้ระบุ → scan ทุกไฟล์ใน:
- `src/components/features/**/*.tsx`
- `src/app/(dashboard)/**/*.tsx`
- `src/app/(auth)/**/*.tsx`

---

## ขั้นที่ 3 — ตรวจหา Violations

### 3A — Hardcoded Colors

```
style={{ color/backgroundColor/borderColor: "..." }}
className="text-[#...]" / "bg-[#...]" / "border-[#...]"
className="text-gray-*" / "bg-gray-*"
className="text-blue-*" / "bg-blue-*"
className="text-green-*" / "bg-green-*"
className="text-red-*" / "bg-red-*"
className="text-yellow-*" / "bg-yellow-*"
className="text-orange-*" / "bg-orange-*"
```

Token Map (จาก `src/app/globals.css`):

| Hardcode | Token |
|---|---|
| `#ffffff` | `bg-background-default` / `text-text-inverse` / `text-text-on-brand` |
| `#f8fafc` | `bg-background-subtle` |
| `#f1f5f9` | `bg-background-muted` |
| `#0f172a` | `text-text-primary` |
| `#475569` | `text-text-secondary` |
| `#94a3b8` | `text-text-tertiary` / `text-text-placeholder` |
| `#cbd5e1` | `text-text-disabled` / `border-border-strong` |
| `#e2e8f0` | `border-border-default` |
| `#000f9f` | `bg-brand-blue` / `text-text-link` |
| `#000b78` | `bg-brand-blue-hover` / `text-text-link-hover` |
| `#eef0ff` | `bg-brand-blue-subtle` |
| `#ffd100` | `bg-brand-yellow` |
| `#f5333f` | `bg-brand-red` / `bg-status-error` |
| `#f0fdf4` | `bg-status-success-bg` |
| `#15803d` | `text-status-success-text` |
| `#fff7ed` | `bg-status-warning-bg` |
| `#c2410c` | `text-status-warning-text` |
| `#fef0f1` | `bg-status-error-bg` |
| `#a11720` | `text-status-error-text` |

### 3B — Hardcoded Typography

```
style={{ fontFamily/fontSize/fontWeight: "..." }}
className="font-['Noto_Looped_Thai']"
className="text-[12px]" / "text-[14px]" / "text-[Npx]"  → ใช้ Tailwind scale แทน
```

### 3C — Hardcoded Spacing / Sizing

```
style={{ padding/margin/width/height: "..." }}
className="w-[Npx]" / "h-[Npx]" / "p-[Npx]" / "m-[Npx]"  → ใช้ Tailwind scale แทน
ยกเว้น: fixed layout width ที่ระบุจาก Figma (เช่น w-[792px] showcase frame)
```

### 3D — Inline Elements ที่ควรเป็น Shared Component

| Pattern ที่เจอ | Component ที่ควรใช้ |
|---|---|
| `<div className="...rounded-full...">` + ชื่อย่อ/รูป | `<Avatar>` |
| `<span className="...rounded...text-xs...">` label สถานะ | `<Badge>` |
| `<button className="...">` ที่ไม่ใช่ shadcn | `<Button>` |
| `<input className="...">` ที่ไม่ใช่ shadcn | `<Input>` |
| `<div className="...border...rounded...shadow...">` card | `<Card>` |
| `<select>` หรือ custom dropdown | `<Select>` |
| `<textarea>` ที่ไม่ใช่ shadcn | `<Textarea>` |
| `<input type="checkbox">` ที่ไม่ใช่ shadcn | `<Checkbox>` |

---

## ขั้นที่ 4 — รายงานผล (ก่อนแก้ไขทุกครั้ง)

```
## Audit Report: <filename>

### ❌ Hardcoded Colors (<N> จุด)
- L<line>: `<code>` → แนะนำ: `<token>`

### ❌ Hardcoded Typography (<N> จุด)
- L<line>: `<code>` → แนะนำ: `<fix>`

### ❌ Hardcoded Spacing/Sizing (<N> จุด)
- L<line>: `<code>` → แนะนำ: `<fix>`

### ⚠️ Inline Elements ที่ควรเป็น Shared Component (<N> จุด)
- L<line>: `<description>` → ต้องการ: `<component name>`

### ✅ ไม่พบ violations
```

---

## ขั้นที่ 5 — แก้ไข

### Decision Tree สำหรับทุก violation

```
พบ hardcode หรือ inline element
        ↓
ตรวจสอบ Figma DSM (search_design_system หรือ get_design_context)
        ↓
        ├── มี component ใน Figma DSM แล้ว
        │       ↓
        │   ตรวจสอบ src/components/shared/
        │       ├── มี shared component แล้ว → แก้ inline / hardcode ได้เลย
        │       └── ยังไม่มี shared component → ขั้น 5B (แปลง Figma → Code)
        │
        └── ไม่มี component ใน Figma DSM
                ↓
            ขั้น 5A: สร้างใน Figma DSM ก่อน
                ↓
            ขั้น 5B: แปลง Figma → Code
                ↓
            ขั้น 5C: Replace hardcode / inline
```

---

### 5A — สร้าง Component ใน Figma DSM

อ่าน `docs/create-figma-components.md` ทุกครั้งก่อนเริ่ม แล้วทำตามลำดับ:

1. **ค้นหา Atomic components** ที่จะใช้ใน component ใหม่ด้วย `search_design_system` — ห้ามวาด element เองถ้ามี atomic อยู่แล้ว
2. **สร้าง variant frames** ตาม states ที่ต้องการ
3. **Create Component Set**
4. **Bind ทุก fill/stroke/text ด้วย DSM variable** — ห้าม hardcode สี
5. **Apply Text Style** จาก library ทุก text node — ห้าม hardcode font
6. **วางใน page ที่ถูก**:
   - Primitive/Atomic → Primitives page (`node-id=1-22`)
   - Composite/Complex → Components page (`node-id=4-6598`)
7. **สร้าง showcase frame** ตาม pattern 792px ใน `create-figma-components.md`

Checklist ก่อน mark ว่าเสร็จ:
```
[ ] ทุก fill bind variable (fills[0]?.boundVariables?.color)
[ ] ทุก stroke bind variable
[ ] ทุก text color bind variable
[ ] ทุก text node มี textStyleId (ไม่ใช่ null)
```

---

### 5B — แปลง Figma → Code (Shared Component)

อ่าน `docs/component-api-plan.md` ก่อนเสมอ แล้วสร้างใน `src/components/shared/<name>/`:

ไฟล์ที่ต้องมี:
- `<name>.tsx` — CVA + forwardRef + asChild + cn()
- `<name>.types.ts` — TypeScript interface
- `<name>.md` — Figma ref, Props table, Usage

กฎ:
- ทุก color ใช้ Tailwind token — ห้าม hardcode
- Export `variants` ออกมาเสมอ
- ห้ามแก้ `src/components/ui/` — extend ใน `shared/` เท่านั้น

---

### 5C — Replace Hardcode / Inline ด้วย Shared Component

หลังจากมี shared component แล้ว:

1. Import shared component เข้าไฟล์ที่มี violation
2. แทนที่ inline HTML หรือ hardcode ด้วย component + props ที่ถูกต้อง
3. ถ้าต้องการ color นอก variant → ใช้ `className` override ด้วย token (ไม่ต้องสร้าง variant ใหม่)
4. ลบ import ที่ไม่ได้ใช้

---

## ขั้นที่ 6 — Verify หลังแก้

```
[ ] ไม่มี style={{ color/backgroundColor/borderColor }} เหลือ
[ ] ไม่มี className="text-[#...]" / "bg-[#...]" เหลือ
[ ] ไม่มี Tailwind color scale (gray-*, blue-* ฯลฯ) ที่ควรเป็น token
[ ] Figma component มี variable binding และ text style ครบ
[ ] Shared component ผ่าน checklist ใน component-api-plan.md
[ ] TypeScript ไม่มี error ใหม่
[ ] import ครบและไม่มี unused import
```

---

## กฎสำคัญ (ห้ามลืม)

```
✅ Figma DSM คือต้นฉบับ — ต้องมี Figma component ก่อนเสมอ
✅ พบ violation → ตรวจ Figma ก่อน → สร้าง Figma ถ้าไม่มี → แปลงเป็น Code → Replace
✅ shared component มีอยู่แต่ไม่มี variant ตรง → ใช้ className override ด้วย token ได้เลย
❌ ห้ามสร้าง shared component ก่อนมี Figma component
❌ ห้ามแก้ src/components/ui/ โดยตรง
❌ ห้าม hardcode ค่าใหม่ระหว่างแก้ — ใช้ token เสมอ
❌ ห้ามวาด element ใน Figma เองถ้ามี Atomic component อยู่แล้ว
```
