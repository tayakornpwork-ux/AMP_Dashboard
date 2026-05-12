# Checkbox

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Component set node: 1:117 (Primitives page)
- Component key: `c532aca3520e72f2e10387ca3d40c67fc5fea02c`
- 7 variants: default, with text, checked, checked with text, disabled, with text and description, checked with text and description
- Disabled checked ใช้ Option B (brand-blue-muted แทนสีเทา)

---

## Props

| Prop          | Type      | Default | หมายเหตุ |
|---------------|-----------|---------|---------|
| `label`       | `string`  | —       | ข้อความ label ด้านขวา |
| `description` | `string`  | —       | ข้อความ helper ใต้ label |
| `checked`     | `boolean` | —       | controlled state |
| `defaultChecked` | `boolean` | —    | uncontrolled state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Radix callback |
| `disabled`    | `boolean` | —       | HTML native |
| `className`   | `string`  | —       | override บน root element |

> ใช้ Radix UI `@radix-ui/react-checkbox` เป็น base

---

## States & Variants

| Variant | สถานะ |
|---------|-------|
| Unchecked | border-border-strong, bg-background-default |
| Checked | bg-brand-blue, border-brand-blue, checkmark ขาว |
| Disabled unchecked | opacity-50, cursor-not-allowed |
| Disabled checked | bg-brand-blue-muted, border-brand-blue-muted (Option B) |

---

## Usage

```tsx
import { Checkbox } from "@/components/shared/checkbox/checkbox"

// Bare checkbox (ไม่มี label)
<Checkbox />

// With label
<Checkbox label="ยอมรับเงื่อนไข" />

// With label + description
<Checkbox
  label="รับการแจ้งเตือน"
  description="รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ"
/>

// Controlled
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="เลือกทั้งหมด"
/>

// Disabled
<Checkbox disabled label="ไม่สามารถเปลี่ยนแปลงได้" />
<Checkbox disabled checked label="ล็อคอยู่" />
```

---

## Notes

- ใช้ `useId()` สร้าง id อัตโนมัติ — ไม่ต้องส่ง id เองถ้าไม่จำเป็น
- `label` click แล้ว toggle checkbox ได้เลย (ผ่าน htmlFor)
- Disabled + checked ใช้ `brand-blue-muted` ตาม Option B (ไม่ใช่สีเทา)
- `description` ไม่มีใน Figma component โดยตรง แต่ extend เพิ่มเพื่อ usability
