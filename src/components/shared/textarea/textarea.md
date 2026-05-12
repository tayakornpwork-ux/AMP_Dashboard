# Textarea

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Component set node: 8:268 (Primitives page)
- Component key: `7494b78a4e9451f656bf5033c31fcd10c70ffea0`
- States: Default, disabled (2 variants — "with button" type ถูกลบออกแล้ว, compose ข้างนอกแทน)

Token ที่ confirm จาก Figma:
- bg: `--color-background-default` (white)
- border: `--color-border-strong` (#cbd5e1)
- radius: `rounded-md` (6px)
- padding: `px-3 py-2` (12px/8px)
- placeholder: `--color-text-disabled` (disabled state)

---

## Props

| Prop        | Type                                        | Default      | หมายเหตุ |
|-------------|---------------------------------------------|--------------|---------|
| `error`     | `boolean`                                   | `false`      | border เปลี่ยนเป็น status-error |
| `resize`    | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | CSS resize behavior |
| `disabled`  | `boolean`                                   | —            | HTML native |
| `className` | `string`                                    | —            | override |

> รับ props ทุกตัวของ `<textarea>` HTML element

---

## States

| State    | Visual |
|----------|--------|
| default  | bg-background-default, border-border-strong |
| focus    | border-border-focus, ring-1 |
| error    | border-status-error |
| disabled | bg-background-subtle, border-border-disabled, cursor-not-allowed |

---

## Usage

```tsx
import { Textarea } from "@/components/shared/textarea/textarea"

// Default
<Textarea placeholder="พิมพ์ข้อความที่นี่..." />

// Error
<Textarea error placeholder="กรุณากรอกข้อมูล" />

// Disabled
<Textarea disabled placeholder="ไม่สามารถแก้ไขได้" />

// No resize
<Textarea resize="none" placeholder="ความสูงคงที่" />

// กับ label
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-medium text-text-primary">ข้อความ</label>
  <Textarea placeholder="Type your message here" />
</div>
```

---

## Notes

- `min-h-[80px]` ตรงกับ Figma (height: 80px)
- ไม่มี `label` prop ใน component — ใช้ `<label>` แยกข้างนอก
- "with button" variant ถูกลบออกจาก Figma แล้ว — compose ที่ feature layer แทน (Textarea + Button วางซ้อนกัน)
