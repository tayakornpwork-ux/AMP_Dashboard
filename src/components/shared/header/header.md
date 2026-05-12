# Header

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Component: `Header` — Components page
- Variant: Single (1232×56px)

## Props

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `user.name` | `string` | — | ชื่อผู้ใช้ |
| `user.role` | `string` | — | ตำแหน่ง/บทบาท |
| `user.initials` | `string` | — | ตัวย่อสำหรับ Avatar (เช่น "AR") |
| `onLogout` | `() => void` | — | callback เมื่อกด "ออกจากระบบ" |
| `className` | `string` | — | override class ของ `<header>` |

## Usage

```tsx
import { Header } from "@/components/shared/header/header"

<Header
  user={{ name: "อเล็กซ์ ริเวรา", role: "ผู้ดูแลระบบ", initials: "AR" }}
  onLogout={() => router.push("/login")}
/>
```

## Notes
- เป็น Client Component ("use client") เพราะมี dropdown state
- Avatar ใช้ `Avatar` + `AvatarFallback` จาก `shared/avatar`
- Dropdown ปิดอัตโนมัติเมื่อคลิกนอก component
