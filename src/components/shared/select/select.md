# Select

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [13-1448](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=13-1448)
- Component: "Select"

## Components

| Component | หมายเหตุ |
|---|---|
| `Select` | root wrapper (Radix Root) |
| `SelectTrigger` | ปุ่มที่กด — รับ `error` prop |
| `SelectValue` | แสดง placeholder หรือ selected value |
| `SelectContent` | dropdown container |
| `SelectGroup` | กลุ่ม items |
| `SelectLabel` | หัวข้อของ group |
| `SelectItem` | ตัวเลือกแต่ละรายการ |
| `SelectSeparator` | เส้นแบ่งระหว่าง group |

## Props — Select (Root)

extends `@radix-ui/react-select` Root props ทั้งหมด

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `value` | `string` | — | controlled value |
| `defaultValue` | `string` | — | uncontrolled default |
| `onValueChange` | `(value: string) => void` | — | |
| `disabled` | `boolean` | `false` | |
| `open` | `boolean` | — | controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | |

## Props — SelectTrigger

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `error` | `boolean` | `false` | แสดง border สีแดง + ring สีแดงเมื่อ focus |
| `className` | `string` | — | ใช้กำหนด width เช่น `className="w-[204px]"` |

## Props — SelectItem

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `value` | `string` | **required** | |
| `disabled` | `boolean` | `false` | |
| `className` | `string` | — | |

## Usage

```tsx
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@/components/shared/select/select"

// Basic
<Select>
  <SelectTrigger className="w-[204px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

// With groups
<Select>
  <SelectTrigger className="w-[204px]">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot" disabled>Carrot</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// Error state
<Select>
  <SelectTrigger error>
    <SelectValue placeholder="กรุณาเลือก" />
  </SelectTrigger>
  ...
</Select>

// Controlled
<Select value={value} onValueChange={setValue}>
  ...
</Select>
```

## Notes
- `SelectTrigger` ไม่มี default width — ต้องกำหนด `className="w-[…]"` หรือวางใน container ที่มี width
- Dropdown width จะ match width ของ trigger อัตโนมัติ (`w-[--radix-select-trigger-width]`)
- ใช้ `SelectLabel` เป็น header ของ group ได้ — ไม่ใช่ `<label>` สำหรับ form
