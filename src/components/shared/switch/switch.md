# Switch

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [13-1482](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=13-1482)
- Component: "Switch"

## Props

extends `@radix-ui/react-switch` Root props ทั้งหมด

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `checked` | `boolean` | — | controlled state |
| `defaultChecked` | `boolean` | `false` | uncontrolled default |
| `onCheckedChange` | `(checked: boolean) => void` | — | callback เมื่อ toggle |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | text แสดงข้าง switch |
| `description` | `string` | — | คำอธิบายย่อยใต้ label |
| `id` | `string` | auto-generated | ถ้าไม่ส่งจะ generate ด้วย `useId()` |
| `className` | `string` | — | override styles บน track |

## Usage

```tsx
import { Switch } from "@/components/shared/switch/switch"

// Basic
<Switch />

// With label
<Switch label="Airplane mode" />

// With label + description
<Switch
  label="รับการแจ้งเตือน"
  description="รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ"
/>

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} label="Dark mode" />

// Disabled
<Switch disabled label="ไม่สามารถเปลี่ยนแปลงได้" />
```

## Notes
- Track สี `bg-border-strong` เมื่อ off, `bg-brand-blue` เมื่อ on
- Label ที่ disabled จะเปลี่ยนสีเป็น `text-text-disabled` ผ่าน `peer-disabled:`
- ใช้ร่วมกับ React Hook Form ผ่าน `Controller` + `onCheckedChange`
