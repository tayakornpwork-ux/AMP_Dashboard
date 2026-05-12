# Button

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Component: "button" — node-id: 1:85
- States: Default, hover, disabled (hover/focus handled by CSS, not props)

---

## Props

| Prop        | Type                                                          | Default     | หมายเหตุ |
|-------------|---------------------------------------------------------------|-------------|---------|
| `variant`   | `"default" \| "destructive" \| "outline" \| "subtle" \| "ghost" \| "link"` | `"default"` | สีและรูปแบบของปุ่ม |
| `size`      | `"sm" \| "md" \| "lg" \| "icon" \| "icon-circle"`            | `"md"`      | ขนาดและ shape |
| `loading`   | `boolean`                                                     | `false`     | แสดง spinner + disable อัตโนมัติ |
| `leftIcon`  | `React.ReactNode`                                             | —           | ไอคอนซ้ายมือ (ไม่ใช้เมื่อ size=icon/*) |
| `rightIcon` | `React.ReactNode`                                             | —           | ไอคอนขวามือ (ไม่ใช้เมื่อ size=icon/*) |
| `asChild`   | `boolean`                                                     | `false`     | Render เป็น element ลูก (Radix Slot) |
| `disabled`  | `boolean`                                                     | —           | HTML native disabled |
| `className` | `string`                                                      | —           | Override class เพิ่มเติม |

> รับ props ทุกตัวของ `<button>` HTML element ด้วย (onClick, type, aria-* ฯลฯ)

---

## Variants

| Variant       | ใช้เมื่อ |
|---------------|---------|
| `default`     | Primary action — กระทำหลัก |
| `destructive` | ลบข้อมูล, ยืนยันการกระทำอันตราย |
| `outline`     | Secondary action — ใช้คู่กับ default |
| `subtle`      | Tertiary action — รูปแบบเบา |
| `ghost`       | Action ใน context (เช่น ใน menu, card) |
| `link`        | Navigation หรือ inline action |

## Sizes

| Size          | ขนาด       | ใช้เมื่อ |
|---------------|------------|---------|
| `sm`          | h-8 px-3   | Compact UI, table actions |
| `md`          | h-10 px-4  | Default — ใช้ทั่วไป |
| `lg`          | h-11 px-5  | Hero section, prominent CTA |
| `icon`        | 32×32px    | Icon-only, square — ใช้แทน leftIcon |
| `icon-circle` | 40×40px    | Icon-only, rounded — FAB-style |

> `icon` และ `icon-circle` จะ override สี variant — จะใช้ outline style เสมอ (ตาม Figma)

---

## Usage

```tsx
import { Button } from "@/components/shared/button/button"
import { Mail, Plus, Trash2 } from "lucide-react"

// Default
<Button>Continue</Button>

// Variants
<Button variant="destructive">ลบรายการ</Button>
<Button variant="outline">ยกเลิก</Button>
<Button variant="subtle">ดูเพิ่มเติม</Button>
<Button variant="ghost">แก้ไข</Button>
<Button variant="link">เรียนรู้เพิ่มเติม</Button>

// With icon
<Button leftIcon={<Mail />}>Login with Email</Button>
<Button variant="outline" rightIcon={<Mail />}>Send</Button>

// Icon only
<Button size="icon"><Plus /></Button>
<Button size="icon-circle"><Plus /></Button>

// States
<Button disabled>ไม่สามารถใช้งาน</Button>
<Button loading>กำลังบันทึก...</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// asChild — render เป็น <a> tag
<Button asChild>
  <a href="/dashboard">ไปยัง Dashboard</a>
</Button>
```

---

## Notes

- `loading={true}` จะ disable ปุ่มอัตโนมัติและแสดง spinner — ไม่ต้องส่ง `disabled` ซ้อน
- `size="icon"` และ `size="icon-circle"` — `variant` prop ไม่มีผล (ใช้ outline style เสมอ ตาม Figma)
- Hover/focus states ถูกจัดการโดย CSS (:hover, :focus-visible) — ไม่ใช่ prop
- `leftIcon` / `rightIcon` จะถูกซ่อนอัตโนมัติเมื่อ size เป็น icon
