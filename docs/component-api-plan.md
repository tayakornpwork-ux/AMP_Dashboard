# Component API Plan

> **กฎสำคัญ**: ทุกครั้งที่เริ่มทำ Component API ให้อ่านไฟล์นี้ก่อนเสมอ

---

## หลักการ (Way of Work)

```
Figma Component
      ↓
1. Audit props & states จาก Figma
      ↓
2. Map → TypeScript API
      ↓
3. Build ใน shared/ (extend shadcn — ห้ามแก้ ui/ โดยตรง)
      ↓
4. Document ใน component.md
      ↓
5. ใช้ใน features/ & pages/
```

---

## ข้อระวัง (ต้องจำทุกครั้ง)

### 1. Figma State ≠ React Prop
Visual states บางอย่างใน Figma ไม่ใช่ prop — CSS จัดการแทน

| Figma state | วิธีใน code |
|---|---|
| hover | `:hover` CSS |
| focus | `:focus-visible` CSS |
| pressed / active | `:active` CSS |
| disabled | `disabled` prop + `disabled:` CSS |
| error | `error` prop หรือ `aria-invalid` |

### 2. ห้ามแก้ `ui/` โดยตรง
shadcn components อยู่ใน `src/components/ui/` — ห้ามแก้ไข
ต้อง extend ใน `src/components/shared/` เท่านั้น

### 3. ใช้ Token เท่านั้น — ห้าม hardcode
```tsx
// ✅ ถูก
className="bg-brand-blue text-text-on-brand"

// ❌ ผิด
style={{ backgroundColor: "#000f9f", color: "#ffffff" }}
```

### 4. ตรวจ Token ก่อน implement
ดู `src/app/globals.css` ก่อนทุกครั้งว่า token ที่จะใช้มีอยู่แล้วหรือยัง

---

## กฎการ Reusability (ห้ามข้าม)

### 1. ห้าม Hardcode ค่าใดๆ ทั้งสิ้น

```tsx
// ❌ ผิด — hardcode ทุกรูปแบบ
<div style={{ color: "#000f9f" }} />
<div className="text-[#000f9f]" />
<div className="text-blue-800" />

// ✅ ถูก — ใช้ token เสมอ
<div className="text-brand-blue" />
```

ครอบคลุม: **สี, ขนาด, spacing, border-radius, shadow, font** — ทุกค่าต้องมาจาก token ใน `globals.css`

### 2. Export `variants` ออกมาเสมอ

component อื่นอาจต้องการ style ของ button โดยไม่ใช้ element `<button>`

```tsx
// ✅ export ออกมาเพื่อให้ component อื่น reuse ได้
export { Button, buttonVariants }

// ตัวอย่างการใช้ใน component อื่น
import { buttonVariants } from "@/components/shared/button/button"

<a className={buttonVariants({ variant: "outline", size: "sm" })}>
  Link ที่ดูเหมือนปุ่ม
</a>
```

### 3. `asChild` Pattern — Polymorphic Component

ห้ามสร้าง `<LinkButton>` หรือ `<AnchorButton>` แยกต่างหาก — ใช้ `asChild` แทน

```tsx
// ❌ ผิด — สร้าง component ใหม่โดยไม่จำเป็น
<LinkButton href="/dashboard">ไป Dashboard</LinkButton>

// ✅ ถูก — ใช้ asChild + Radix Slot
<Button asChild>
  <a href="/dashboard">ไป Dashboard</a>
</Button>

// ✅ ถูก — ใช้กับ Next.js Link
<Button asChild>
  <Link href="/dashboard">ไป Dashboard</Link>
</Button>
```

### 4. `className` prop ต้องมีทุก component

เพื่อให้ผู้ใช้ override style ได้โดยไม่ต้องสร้าง component ใหม่

```tsx
// ✅ ถูก — รับ className เสมอ และต้อง merge ด้วย cn()
<Button className="w-full">Full width</Button>

// ในโค้ด component ต้องใช้ cn() เพื่อ merge เสมอ
className={cn(buttonVariants({ variant, size }), className)}
```

### 5. ห้ามสร้าง Component ใหม่ถ้า Variant ทำได้

ก่อนสร้าง component ใหม่ ให้ถามก่อนว่า:

| คำถาม | คำตอบ |
|---|---|
| ต่างกันแค่สี? | เพิ่ม variant ใน CVA |
| ต่างกันแค่ขนาด? | เพิ่ม size ใน CVA |
| ต่างกันแค่ content? | ใช้ children / leftIcon / rightIcon |
| ต้องการ element ต่างออกไป? | ใช้ `asChild` |
| ซับซ้อนจริงๆ และทำใน CVA ไม่ได้? | **หยุด — กลับมาถามก่อนเสมอ** |

> **STOP & ASK**: ถ้าประเมินแล้วจำเป็นต้องสร้าง component ใหม่จริงๆ ให้หยุดและกลับมาขอ confirm ก่อนทุกครั้ง — ห้ามสร้างเองโดยไม่ได้รับอนุญาต

### 6. `forwardRef` ทุก component

ช่วยให้ library อื่น (Radix, React Hook Form) เข้าถึง DOM node ได้

```tsx
// ✅ ทุก component ต้องใช้ forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => <button ref={ref} {...props} />
)
Button.displayName = "Button"
```

### 8. STOP & ASK ก่อนสร้าง Component ใหม่

```
ประเมิน variant/size/asChild แล้วยังไม่พอ?
        ↓
   หยุดทันที
        ↓
รายงานเหตุผลที่ต้องสร้างใหม่
        ↓
รอ confirm ก่อนเสมอ — ห้ามสร้างเอง
```

---

### 7. Spread HTML Props — ห้าม block native attributes

```tsx
// ✅ ถูก — spread ...props เสมอ เพื่อรองรับ aria-*, data-*, form attrs
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(...)} {...props} />
  )
)
```

---

## Figma as Source of Truth

> **กฎหลัก**: Figma คือต้นฉบับเสมอ — เมื่อ Figma เปลี่ยน code ต้องเปลี่ยนตาม ไม่ใช่กลับกัน

### Update Flow เมื่อ Figma มีการเปลี่ยนแปลง

```
Figma มีการเปลี่ยนแปลง (สี / ขนาด / variant / structure)
        ↓
1. ดึง design context ใหม่จาก Figma MCP
        ↓
2. ตรวจว่าเปลี่ยนที่ระดับไหน
        ↓
   Token เปลี่ยน → แก้ globals.css → ทุก component อัปเดตอัตโนมัติ
   Variant เปลี่ยน → แก้ CVA ใน component นั้น
   Structure เปลี่ยน → แก้ JSX + อัปเดต button.md
        ↓
3. อัปเดต component-api-plan.md (สถานะ / checklist)
```

### ลำดับความสำคัญของการ Update

| ระดับ | เปลี่ยนแปลงที่ | ผลกระทบ | วิธีแก้ |
|---|---|---|---|
| **Token** | Figma Semantic variable (สี, radius, shadow) | ทุก component ที่ใช้ token นั้น | แก้ `globals.css` ที่เดียว |
| **Variant** | Figma เพิ่ม/ลบ/เปลี่ยน variant ของ component | เฉพาะ component นั้น | แก้ CVA + `.types.ts` + `.md` |
| **Structure** | Layout, composition, หรือ prop ใหม่ | เฉพาะ component นั้น + ที่ใช้งาน | แก้ JSX + types + docs |
| **Component ใหม่** | Figma เพิ่ม component ใหม่ | — | ทำตาม checklist ตั้งแต่ต้น |

### กฎห้ามทำ

```
❌ ห้ามแก้สีหรือขนาดใน code โดยไม่มีการเปลี่ยนใน Figma ก่อน
❌ ห้าม override token ด้วย hardcode เพื่อ quick fix
❌ ห้ามสร้าง variant ใน code ที่ไม่มีอยู่ใน Figma
```

### ข้อยกเว้น

กรณีที่แก้ใน code ได้โดยไม่ต้องรอ Figma:
- Bug fix ที่ไม่กระทบ visual (accessibility, TypeScript, logic)
- เพิ่ม HTML attributes (`aria-*`, `data-*`) เพื่อ functionality
- Performance optimization ที่ไม่เปลี่ยน visual

---

## Token Audit Status

| หมวด | สถานะ |
|---|---|
| Color tokens (63 semantic) | ✅ ครบ |
| Border radius (sm/md/lg/xl/full) | ✅ ครบ |
| Shadow (sm/md/lg) | ✅ ครบ |
| Font family | ✅ ครบ |
| Font size scale | ⚠️ ใช้ Tailwind default (text-sm, text-base ฯลฯ) |
| Spacing scale | ⚠️ ใช้ Tailwind default (p-2, p-4 ฯลฯ) |

---

## Component Build Order

เรียงตาม dependency — ต้องทำตามลำดับนี้

```
1. Button          ← base ของทุกอย่าง
2. Input           ← form foundation
3. Textarea        ← extends Input logic
4. Checkbox        ← form element
5. Select          ← Radix Select + token
6. Badge           ← display only
7. Avatar          ← display only
8. Card            ← layout container
9. Dialog / Modal  ← overlay
10. Toast          ← feedback
```

---

## Checklist ต่อ 1 Component

ทุก component ต้องผ่านทุกข้อก่อน mark ว่าเสร็จ

```
Design
[ ] อ่าน Figma — จด props, variants, states ทั้งหมด
[ ] ตรวจว่า token ที่จะใช้มีใน globals.css ครบแล้ว

TypeScript
[ ] TypeScript interface ครบ (ตรงกับ Figma properties)
[ ] Spread HTML props (...props) — ไม่ block native attributes

Variants & Styles
[ ] CVA variants ครอบคลุมทุก Figma variant
[ ] States ครบ: default, hover, focus, disabled, error (CSS only)
[ ] ใช้ token ทุกค่า — ห้าม hardcode สี, ขนาด, spacing ทุกรูปแบบ

Reusability
[ ] Export variants ออกมา (เช่น buttonVariants) เพื่อให้ component อื่น reuse
[ ] asChild pattern — ห้ามสร้าง component ใหม่ถ้า asChild ทำได้
[ ] className prop + cn() merge — override ได้จากภายนอก
[ ] forwardRef — รองรับ ref จาก parent และ library อื่น
[ ] ถามก่อนสร้าง component ใหม่ — variant/size/asChild ทำได้ไหม?

Structure
[ ] ไม่แก้ ui/ — สร้างและ extend ใน shared/ เท่านั้น
[ ] เขียน component.md (Figma ref, Props table, Usage, Notes)
```

---

## โครงสร้างไฟล์ต่อ Component

```
src/components/shared/
└── button/
    ├── button.tsx        ← component code
    ├── button.types.ts   ← TypeScript interface
    └── button.md         ← API docs + usage examples
```

---

## Format ของ component.md

```md
# ComponentName

## Figma Reference
- File: [AMP] Dashboard
- Node: <node-id>
- Component: "<Figma component path>"

## Props

| Prop     | Type                     | Default   | หมายเหตุ |
|----------|--------------------------|-----------|---------|
| variant  | "default" \| "outline"   | "default" |         |
| size     | "sm" \| "md" \| "lg"     | "md"      |         |
| disabled | boolean                  | false     |         |

## Usage

\`\`\`tsx
import { Button } from "@/components/shared/button/button"

<Button variant="outline" size="sm">ยกเลิก</Button>
<Button variant="default" disabled>กำลังบันทึก</Button>
\`\`\`

## Notes
- สิ่งที่ต่างจาก shadcn base (ถ้ามี)
- ข้อจำกัดหรือ edge case ที่ควรรู้
```

---

## Figma File Reference

| ข้อมูล | ค่า |
|---|---|
| File Key | `yBBt8LTSVb2toD6MDg1VAf` |
| File Name | [DSM] AMP Dashboard |
| Components Page | node-id: 1-85 |

---

## สถานะ Component API

| Component | Figma | Types | Code | Docs |
|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ |
| Textarea | ✅ | ✅ | ✅ | ✅ |
| Checkbox | ✅ | ✅ | ✅ | ✅ |
| Radio | ✅ | ✅ | ✅ | ✅ |
| Switch | ✅ | ✅ | ✅ | ✅ |
| Select | ✅ | ✅ | ✅ | ✅ |
| Avatar | ✅ | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ |
| Dialog | ✅ | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ | ✅ |
| Sidebar | ✅ | ✅ | ✅ | ✅ |
| Header | ✅ | ✅ | ✅ | ✅ |
| DataTable | ✅ | ✅ | ✅ | ✅ |
