# StatCard

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: 1391:822
- Component: "stat-card"

## Props

| Prop      | Type                        | Default | หมายเหตุ                          |
|-----------|-----------------------------|---------|-----------------------------------|
| label     | string                      | —       | หัวเรื่อง metric (uppercase)      |
| value     | string                      | —       | ค่าหลัก                           |
| change    | string                      | —       | ค่าเปลี่ยนแปลง เช่น "+12%"        |
| trend     | "positive" \| "negative"    | —       | กำหนดสี change text               |
| icon      | React.ReactNode             | —       | optional icon ด้านขวาบน           |
| className | string                      | —       | override Card styles              |

## Usage

```tsx
import { StatCard } from "@/components/shared/stat-card/stat-card"
import { Users } from "lucide-react"

<StatCard
  label="ลีดทั้งหมด"
  value="12,482"
  change="+12%"
  trend="positive"
  icon={<Users className="h-5 w-5" />}
/>

<StatCard
  label="ต้นทุนต่อลีด"
  value="฿680"
  change="↓2.1%"
  trend="negative"
  icon={<DollarSign className="h-5 w-5" />}
/>
```

## Notes
- Left accent bar สีเหลือง (bg-brand-yellow) เป็น absolute positioned
- trend="positive" → change text ใช้ text-status-success-text
- trend="negative" → change text ใช้ text-status-error-text
- extends Card — ทุก Card props ใช้ได้ผ่าน ...props
