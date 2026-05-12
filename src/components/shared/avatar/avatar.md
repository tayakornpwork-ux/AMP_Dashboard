# Avatar

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [13-1051](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=13-1051)
- Component: "Avatar"

## Components

| Component | หมายเหตุ |
|---|---|
| `Avatar` | root wrapper — รับ `size` prop |
| `AvatarImage` | แสดงรูปภาพ |
| `AvatarFallback` | fallback เมื่อรูปโหลดไม่ได้ — ใส่ initials |

## Props — Avatar

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | |
| `className` | `string` | — | |

| Size | ขนาด |
|---|---|
| `sm` | 32×32px |
| `md` | 40×40px |
| `lg` | 48×48px |
| `xl` | 56×56px |

## Props — AvatarImage

extends `@radix-ui/react-avatar` Image props ทั้งหมด

| Prop | Type | หมายเหตุ |
|---|---|---|
| `src` | `string` | URL ของรูป |
| `alt` | `string` | accessibility text |

## Props — AvatarFallback

extends `@radix-ui/react-avatar` Fallback props ทั้งหมด — ใส่ text เป็น children

## Usage

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shared/avatar/avatar"

// With image
<Avatar size="md">
  <AvatarImage src="https://example.com/photo.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Fallback only (no image)
<Avatar size="lg">
  <AvatarFallback>TP</AvatarFallback>
</Avatar>

// All sizes
<div className="flex items-center gap-4">
  <Avatar size="sm"><AvatarFallback>S</AvatarFallback></Avatar>
  <Avatar size="md"><AvatarFallback>M</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>L</AvatarFallback></Avatar>
  <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
</div>
```

## Notes
- `AvatarFallback` แสดงอัตโนมัติเมื่อ `AvatarImage` โหลดล้มเหลว — ไม่ต้องจัดการ error state เอง
- Fallback ใช้สี `bg-brand-blue-muted` + `text-brand-blue-text` ตาม Figma
- export `avatarVariants` ไว้ให้ component อื่น reuse CVA classes ได้
