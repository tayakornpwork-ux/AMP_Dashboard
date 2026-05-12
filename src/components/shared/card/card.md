# Card

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [1281-807](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=1281-807)
- Component: "card" (COMPONENT node: 1281:807, Primitives page)

## Sub-components

| Component | Element | หมายเหตุ |
|---|---|---|
| `Card` | `<div>` | root container — `bg-background-default border border-border-strong rounded-lg` |
| `CardHeader` | `<div>` | `flex flex-col gap-1.5 p-6` |
| `CardTitle` | `<h3>` | Figma: body/large — 18px SemiBold, text-primary |
| `CardDescription` | `<p>` | Figma: body/subtle — 14px Regular, text-tertiary |
| `CardDivider` | `<div>` | `h-px bg-border-default` — fill สี ไม่ใช่ border-top |
| `CardContent` | `<div>` | `flex flex-col p-6` |
| `CardFooter` | `<div>` | `flex items-center justify-end gap-2 px-6 pb-6` |

## Props

ทุก sub-component รับ props เดียวกับ native HTML element ของมัน + `className`

| Sub-component | Extends |
|---|---|
| `Card` | `React.HTMLAttributes<HTMLDivElement>` |
| `CardHeader` | `React.HTMLAttributes<HTMLDivElement>` |
| `CardTitle` | `React.HTMLAttributes<HTMLHeadingElement>` |
| `CardDescription` | `React.HTMLAttributes<HTMLParagraphElement>` |
| `CardDivider` | `React.HTMLAttributes<HTMLDivElement>` |
| `CardContent` | `React.HTMLAttributes<HTMLDivElement>` |
| `CardFooter` | `React.HTMLAttributes<HTMLDivElement>` |

## Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardDivider,
  CardContent,
  CardFooter,
} from "@/components/shared/card/card"
import { Button } from "@/components/shared/button/button"

// Full composition (Figma default)
<Card className="w-[380px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardDivider />
  <CardContent>
    <p className="text-sm text-text-secondary">Your content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Save changes</Button>
  </CardFooter>
</Card>

// Header only
<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
</Card>

// Figma showCancel=true → 2 ปุ่มใน footer (gap-2 built-in)
<CardFooter>
  <Button variant="outline">Cancel</Button>
  <Button>Save changes</Button>
</CardFooter>
```

## Figma Component Property

| Property | Type | Default | หมายเหตุ |
|---|---|---|---|
| `showCancel` | boolean | `false` | toggle visibility ของ Cancel button ใน footer |

ใน Figma: toggle `showCancel` เพื่อดู 2 ปุ่ม
ใน code: ใส่ `<Button variant="outline">` เพิ่มใน `CardFooter` ได้เลย — `gap-2` built-in แล้ว

## Notes
- Card ไม่มี variants — เป็น layout container ล้วนๆ ไม่ใช้ CVA
- ทุก sub-component ใช้ `forwardRef` และรับ `className` เพื่อ override ได้
- `CardDivider` เป็น `<div h-px bg-border-default>` (fill) ไม่ใช่ `<hr border-t>`
- `CardFooter` default เป็น `justify-end gap-2` — รองรับ 1 หรือ 2 ปุ่มโดยไม่ต้อง override
- ไม่มี `asChild` pattern เพราะ Card เป็น layout container ไม่ใช่ interactive element
