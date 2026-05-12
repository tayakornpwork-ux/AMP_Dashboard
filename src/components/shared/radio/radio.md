# Radio

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [13-1316](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=13-1316)
- Component: "Radio Group"

## Components

| Component | หมายเหตุ |
|---|---|
| `RadioGroup` | wrapper — ควบคุม value และ orientation |
| `RadioItem` | radio button เดี่ยว + optional label/description |

## Props — RadioGroup

extends `@radix-ui/react-radio-group` Root props ทั้งหมด

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `value` | `string` | — | controlled value |
| `defaultValue` | `string` | — | uncontrolled default |
| `onValueChange` | `(value: string) => void` | — | callback เมื่อเลือก |
| `disabled` | `boolean` | `false` | disable ทั้ง group |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | |
| `className` | `string` | — | override styles |

## Props — RadioItem

extends `@radix-ui/react-radio-group` Item props ทั้งหมด

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `value` | `string` | **required** | ค่าของ item นี้ |
| `label` | `string` | — | text แสดงข้างปุ่ม |
| `description` | `string` | — | คำอธิบายย่อยใต้ label |
| `disabled` | `boolean` | `false` | disable เฉพาะ item นี้ |
| `id` | `string` | auto-generated | ถ้าไม่ส่งจะ generate ด้วย `useId()` |
| `className` | `string` | — | override styles บน radio button |

## Usage

```tsx
import { RadioGroup, RadioItem } from "@/components/shared/radio/radio"

// Basic
<RadioGroup defaultValue="option1">
  <RadioItem value="option1" label="Option 1" />
  <RadioItem value="option2" label="Option 2" />
  <RadioItem value="option3" label="Option 3" disabled />
</RadioGroup>

// Controlled
<RadioGroup value={value} onValueChange={setValue}>
  <RadioItem value="email" label="Email" description="รับการแจ้งเตือนทางอีเมล" />
  <RadioItem value="sms" label="SMS" description="รับการแจ้งเตือนทาง SMS" />
</RadioGroup>

// Horizontal
<RadioGroup orientation="horizontal" className="flex-row gap-4">
  <RadioItem value="a" label="A" />
  <RadioItem value="b" label="B" />
</RadioGroup>
```

## Notes
- `RadioItem` auto-generate `id` และ link `<label htmlFor>` — ไม่ต้องจัดการเอง
- ใช้ร่วมกับ React Hook Form ได้ผ่าน `Controller` + `onValueChange`
- `disabled` บน `RadioGroup` จะ disable ทุก item ใน group
