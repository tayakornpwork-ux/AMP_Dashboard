# Sidebar

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- Component: `Sidebar` — Components page
- Variants: `State=Expanded` (208px) | `State=Collapsed` (56px)

## Props

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `defaultCollapsed` | `boolean` | `false` | เริ่มต้นในสถานะ collapsed |
| `className` | `string` | — | override class ของ `<aside>` |

## Behavior
- Active state ตรวจจาก `usePathname()` อัตโนมัติ
- กดปุ่ม hamburger เพื่อ toggle expanded/collapsed
- Collapsed: แสดงเฉพาะ icon + tooltip เมื่อ hover
- navItems กำหนดใน `sidebar.tsx` โดยตรง (ไม่รับเป็น prop เพราะ icon component ส่งผ่าน RSC boundary ไม่ได้)

## Usage

```tsx
import { Sidebar } from "@/components/shared/sidebar/sidebar"

<Sidebar />
<Sidebar defaultCollapsed />
```

## Notes
- เป็น Client Component ("use client") เพราะใช้ useState + usePathname
- navItems เปลี่ยนได้ที่ไฟล์ `sidebar.tsx` ตรง `const navItems`
- Logo image อยู่ที่ `public/images/logo-horizontal.svg`
