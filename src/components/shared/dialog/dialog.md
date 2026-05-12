# Dialog

## Figma Reference
- File: [DSM] AMP Dashboard
- Node: [1306-822](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=1306-822)
- Component: "dialog" (COMPONENT_SET node: 1306:822, Components page)

## Props

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `className` | `string` | — | override styles |

## Sub-components

| Component | Element | หมายเหตุ |
|---|---|---|
| `Dialog` | `<div>` | root container — 480px wide, border-border-strong, shadow-lg |
| `DialogHeader` | `<div>` | `flex items-start justify-between pt-6 pb-4 px-6` |
| `DialogTitleGroup` | `<div>` | `flex flex-col gap-2 flex-1 min-w-0` — wraps title + description |
| `DialogTitle` | `<p>` | Figma: heading/h4 — SemiBold 20px, leading-7, tracking-tight, text-primary |
| `DialogDescription` | `<p>` | Figma: body/subtle — Regular 14px, leading-5, text-secondary |
| `DialogClose` | `<button>` | Figma: 24x24, ✕ Inter Regular 14px, text-tertiary |
| `DialogDivider` | `<div>` | `h-px bg-border-default` — separator between header and content |
| `DialogContent` | `<div>` | `flex flex-col px-6 py-4` |
| `DialogFooter` | `<div>` | `flex items-center justify-end gap-2 px-6 pt-4 pb-6` |

## Variants

| Variant | Description | Action button |
|---|---|---|
| `default` | ใช้สำหรับ action ทั่วไป | `<Button>Confirm</Button>` (brand-blue) |
| `destructive` | ใช้สำหรับ action ที่อันตราย/ลบข้อมูล | `<Button variant="destructive">Delete</Button>` (status-error) |

Variant is controlled by composition — ส่ง Button variant ที่ถูกต้องใน DialogFooter เอง ไม่มี variant prop บน Dialog

## Usage

```tsx
import {
  Dialog,
  DialogHeader,
  DialogTitleGroup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogDivider,
  DialogContent,
  DialogFooter,
} from "@/components/shared/dialog/dialog"
import { Button } from "@/components/shared/button/button"

// Default
<Dialog>
  <DialogHeader>
    <DialogTitleGroup>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Provide additional context about this action.</DialogDescription>
    </DialogTitleGroup>
    <DialogClose onClick={handleClose} />
  </DialogHeader>
  <DialogDivider />
  <DialogContent>
    <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
  </DialogContent>
  <DialogFooter>
    <Button variant="outline" onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogFooter>
</Dialog>

// Destructive
<Dialog>
  <DialogHeader>
    <DialogTitleGroup>
      <DialogTitle>ลบข้อมูล</DialogTitle>
      <DialogDescription>การดำเนินการนี้ไม่สามารถย้อนกลับได้</DialogDescription>
    </DialogTitleGroup>
    <DialogClose onClick={handleClose} />
  </DialogHeader>
  <DialogDivider />
  <DialogContent>
    <p className="text-sm leading-5 text-text-secondary">ต้องการลบรายการนี้ใช่หรือไม่?</p>
  </DialogContent>
  <DialogFooter>
    <Button variant="outline" onClick={handleClose}>Cancel</Button>
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  </DialogFooter>
</Dialog>
```

## Notes
- component นี้เป็น **presentational** เท่านั้น — ยังไม่ผูก overlay/backdrop/animation
- `DialogClose` รองรับ `onClick` สำหรับ dismiss handler
- variant ของ dialog ถูก express ผ่าน composition (Button variant) ไม่ใช่ prop บน Dialog
- `DialogTitleGroup` แยก sub-component มาเพื่อให้ layout ตรงกับ Figma (title group + close อยู่ใน flex row เดียวกัน)
