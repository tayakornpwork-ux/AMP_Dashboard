# Toast

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [1301-509](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=1301-509)
- Component: "toast" (COMPONENT_SET node: 1301:509, Primitives page)

## Props

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `variant` | `"default" \| "success" \| "warning" \| "destructive"` | `"default"` | |
| `className` | `string` | — | override styles |

## Sub-components

| Component | Element | หมายเหตุ |
|---|---|---|
| `Toast` | `<div>` | root container — variant-aware, provides context |
| `ToastContent` | `<div>` | `flex flex-col gap-1 flex-1` — wraps title + description |
| `ToastTitle` | `<p>` | Figma: body/medium — สี title เปลี่ยนตาม variant อัตโนมัติผ่าน context |
| `ToastDescription` | `<p>` | Figma: body/subtle — `text-text-secondary` ทุก variant |
| `ToastClose` | `<button>` | Figma: 20x20, ✕ Inter Regular 14px, `text-text-tertiary` |

## Variants

| Variant | Background | Border | Title color |
|---|---|---|---|
| `default` | `background/default` | `border/default` | `text/primary` |
| `success` | `status/success-bg` | `status/success-border` | `status/success-text` |
| `warning` | `status/warning-bg` | `status/warning-border` | `status/warning-text` |
| `destructive` | `status/error-bg` | `status/error-border` | `status/error-text` |

## Usage

```tsx
import {
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/shared/toast/toast"

// Default
<Toast>
  <ToastContent>
    <ToastTitle>Toast title</ToastTitle>
    <ToastDescription>Toast description goes here.</ToastDescription>
  </ToastContent>
  <ToastClose />
</Toast>

// Success
<Toast variant="success">
  <ToastContent>
    <ToastTitle>บันทึกสำเร็จ</ToastTitle>
    <ToastDescription>ข้อมูลถูกบันทึกเรียบร้อยแล้ว</ToastDescription>
  </ToastContent>
  <ToastClose />
</Toast>

// Title only
<Toast variant="warning">
  <ToastContent>
    <ToastTitle>คำเตือน</ToastTitle>
  </ToastContent>
  <ToastClose />
</Toast>
```

## Notes
- `ToastTitle` รับ variant อัตโนมัติจาก `Toast` parent ผ่าน React context — ไม่ต้องส่ง variant ซ้ำ
- `ToastDescription` สี `text-secondary` เสมอทุก variant ตาม Figma
- `ToastClose` เป็น `<button>` — รองรับ `onClick` สำหรับ dismiss handler
- component นี้เป็น **presentational** เท่านั้น — ยังไม่ผูก Radix Toast Provider สำหรับ animation/positioning (ทำเมื่อ implement ใน page จริง)
- export `toastVariants` และ `toastTitleVariants` ไว้ให้ reuse ได้
