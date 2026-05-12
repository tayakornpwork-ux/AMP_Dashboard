# Input

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Node: 2:285
- Component: "input" — component_set

Token ที่ confirm จาก Figma:
- bg: `--color-background-default` (white) ทุก state
- border: `--color-border-strong` (#cbd5e1)
- focus ring: 2px `--color-border-focus` (#000f9f)
- disabled: `opacity-50` (ไม่เปลี่ยน bg)
- placeholder: `--color-text-disabled` (#cbd5e1)
- helper text: `--color-text-tertiary`

---

## Props

| Prop            | Type                  | Default   | หมายเหตุ |
|-----------------|-----------------------|-----------|---------|
| `size`          | `"sm" \| "md"`        | `"md"`    | sm=14px/h-9, md=16px/h-10 |
| `label`         | `string`              | —         | label เหนือ input |
| `helperText`    | `string`              | —         | ข้อความใต้ input |
| `labelPosition` | `"top" \| "left"`     | `"top"`   | Figma: "default" = top, "label to the left" = left |
| `error`         | `boolean`             | `false`   | border + helperText เปลี่ยนเป็น error color |
| `leftIcon`      | `React.ReactNode`     | —         | icon ซ้ายใน field |
| `rightIcon`     | `React.ReactNode`     | —         | icon ขวาใน field |
| `disabled`      | `boolean`             | —         | HTML native — ทำให้ opacity-50 |
| `className`     | `string`              | —         | override class บน `<input>` |

> รับ props ทุกตัวของ `<input>` HTML element

---

## Figma States → CSS

| Figma state | CSS |
|-------------|-----|
| `default`   | placeholder text-text-disabled (ยังไม่มีค่า) |
| `completed` | text-text-primary (มีค่าแล้ว) — ไม่ใช่ prop, แค่ input ที่มีค่า |
| `focused`   | `focus-visible:ring-2 ring-border-focus` |
| `disabled`  | `disabled:opacity-50` |

---

## Figma Types → Props

| Figma type        | React prop |
|-------------------|------------|
| `default`         | `labelPosition="top"` (default) |
| `label to the left` | `labelPosition="left"` |

---

## Usage

```tsx
import { Input } from "@/components/shared/input/input"
import { Search } from "lucide-react"

// Simple input
<Input placeholder="Email" />

// With label + helper text
<Input
  label="Email"
  helperText="Enter your email address"
  placeholder="Email"
/>

// Error state
<Input
  label="Email"
  helperText="อีเมลไม่ถูกต้อง"
  error
  placeholder="Email"
/>

// Label to the left (Figma: "label to the left")
<Input label="Width" labelPosition="left" placeholder="Add value" />

// Small size
<Input size="sm" label="Email" placeholder="Email" />

// With icons
<Input leftIcon={<Search />} placeholder="ค้นหา..." />

// Disabled
<Input disabled label="Email" placeholder="Email" />

// Input + Button (Figma: "with button" — compose ข้างนอก)
<div className="flex gap-2">
  <Input placeholder="Email" />
  <Button>Subscribe</Button>
</div>
```

---

## Notes

- **`button` prop ไม่มีใน component** — Figma วาง button ข้างนอก field (compose ที่ feature layer แทน)
- **`disabled` ใช้ `opacity-50`** ไม่ใช่ `bg-background-subtle` (ตาม Figma)
- **`helperText` + `error`** — helperText จะเปลี่ยนสีเป็น `status-error-text` อัตโนมัติ
- **font size**: md=16px (text-base), sm=14px (text-sm) — ตรงกับ Figma
- **`label` click** แล้ว focus input ได้เลย (htmlFor auto-generated ด้วย useId)
