# Badge

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [1252-972](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=1252-972)
- Component: "badge" (COMPONENT_SET node: 1251:798, Primitives page)

## Props

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "success" \| "warning" \| "destructive" \| "outline"` | `"default"` | |
| `asChild` | `boolean` | `false` | render เป็น child element (เช่น `<a>`) แทน `<div>` |
| `className` | `string` | — | override styles |
| `children` | `React.ReactNode` | — | label ข้างใน badge |

## Variants

| Variant | Fill | Border | Text |
|---|---|---|---|
| `default` | `brand/blue` | — | `text/inverse` |
| `secondary` | `background/subtle` | `border/default` | `text/secondary` |
| `success` | `status/success-bg` | `status/success-border` | `status/success-text` |
| `warning` | `status/warning-bg` | `status/warning-border` | `status/warning-text` |
| `destructive` | `status/error-bg` | `status/error-border` | `status/error-text` |
| `outline` | — | `border/default` | `text/primary` |

## Usage

```tsx
import { Badge } from "@/components/shared/badge/badge"

// Basic
<Badge>New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="outline">Archived</Badge>

// asChild — badge as a link
<Badge asChild variant="default">
  <a href="/changelog">v1.2.0</a>
</Badge>

// reuse badgeVariants styles on another element
import { badgeVariants } from "@/components/shared/badge/badge"

<span className={badgeVariants({ variant: "success" })}>
  Inline success
</span>
```

## Notes
- Badge render เป็น `<div>` โดย default — ใช้ `asChild` ถ้าต้องการ semantic element อื่น เช่น `<a>`, `<span>`
- ไม่มี size variants — ขนาดคงที่ตาม Figma (12px font, px-2.5 py-0.5, rounded-full)
- export `badgeVariants` ไว้ให้ component อื่น reuse CVA classes ได้โดยไม่ต้องใช้ `<Badge>`
