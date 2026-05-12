# Screen Implementation Plan

> **กฎสำคัญ**: ทุกครั้งที่เริ่มขึ้น Screen ให้อ่านไฟล์นี้ก่อนเสมอ

---

## หลักการ (Way of Work)

```
รับ spec / requirement จาก user (คำอธิบาย, column, business logic)
      ↓
เขียน code Screen โดย compose จาก shared/ components ทันที
      ↓
ถ้าเจอ element ใหม่ที่ไม่มีใน shared/ → เขียน inline ใน Screen ก่อน
      ↓
Report: มี inline element อะไร / ควร extract เป็น component ไหม
      ↓
รอ confirm → ถ้าใช่ ทำตาม component-api-plan.md workflow
```

> **หมายเหตุ**: Screen ไม่ได้เริ่มจาก Figma — เริ่มจากการ gen บน code โดยตรง
> Figma ใช้สำหรับสร้าง shared/ component เท่านั้น (ดู component-api-plan.md)

---

## ข้อระวัง (ต้องจำทุกครั้ง)

### 1. ใช้ Components ที่มีใน shared/ เท่านั้น

ก่อนเขียน element ใดๆ ให้ตรวจก่อนว่ามี component ใน `src/components/shared/` รองรับแล้วไหม

| ต้องการอะไร | ใช้ component |
|---|---|
| ปุ่ม | `Button` (variant: default, outline, ghost, destructive, link) |
| input text | `Input` |
| textarea | `Textarea` |
| checkbox | `Checkbox` |
| radio | `Radio` |
| toggle | `Switch` |
| dropdown | `Select` |
| รูปโปรไฟล์ | `Avatar` |
| status label | `Badge` |
| กล่องเนื้อหา | `Card`, `CardHeader`, `CardContent`, `CardFooter` |
| popup ยืนยัน | `Dialog`, `DialogHeader`, `DialogContent`, `DialogFooter` |
| notification | `Toast` |

### 2. ห้าม Hardcode ทุกรูปแบบ

```tsx
// ❌ ผิด
<div style={{ color: "#0f172a", padding: "24px" }} />
<div className="text-[#0f172a]" />
<div className="text-slate-900" />

// ✅ ถูก
<div className="text-text-primary p-6" />
```

ครอบคลุม: **สี, ขนาด, spacing, border-radius, shadow, font** — ทุกค่าต้องมาจาก token ใน `globals.css`

### 3. ถ้าเจอ element ใหม่ที่ไม่มี component → inline ก่อน แล้ว report

ห้ามสร้าง component ใหม่ใน `shared/` เองโดยไม่ได้รับ confirm — ให้เขียน inline ใน Screen ก่อน แล้วแจ้งกลับว่า:
- มีอะไร hardcode บ้าง
- element นี้ควร extract เป็น component ไหม

### 4. โครงสร้างไฟล์ Screen

```
src/app/(dashboard)/
└── <screen-name>/
    └── page.tsx          ← Server Component (metadata + import เท่านั้น)

src/components/features/
└── <screen-name>/
    └── <screen-name>-overview.tsx  ← business content ทั้งหมด ("use client" ถ้ามี state)
```

---

## Checklist ก่อนส่ง Screen

```
[ ] ไม่มี hardcode สี, ขนาด, spacing ทุกรูปแบบ
[ ] ทุก element มาจาก shared/ component หรือ token
[ ] element ที่เขียน inline → report กลับครบแล้ว
[ ] TypeScript ไม่มี error
```
