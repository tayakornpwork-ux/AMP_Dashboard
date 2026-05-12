# CLAUDE.md — AMP Dashboard

อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง

---

## งานมีกี่ประเภท?

```
งานที่ได้รับ
      ├── สร้าง / แก้ Screen (หน้า)     → ดู § Screen
      ├── สร้าง Component ใหม่           → ดู § Component
      └── แก้ Code / Bug fix             → ดู § Code
```

---

## § Screen — ขึ้นหน้าใหม่

> อ่าน `docs/screen-implementation-plan.md` ก่อนเริ่มทุกครั้ง

### กฎหลัก

- ใช้เฉพาะ component ที่มีใน `src/components/shared/` เท่านั้น
- ห้าม hardcode สี / ขนาด / spacing ทุกรูปแบบ — ใช้ token จาก `globals.css`
- element ที่ยังไม่มี component → เขียน inline ใน Screen ก่อน แล้ว report กลับ
- ห้ามสร้าง component ใหม่ใน `shared/` เองโดยไม่ได้รับ confirm

### โครงสร้างไฟล์

```
src/app/(dashboard)/<screen>/
└── page.tsx                  ←얇 (metadata + import เท่านั้น)

src/components/features/<screen>/
└── <screen>-overview.tsx     ← business content ทั้งหมด
```

> อ่าน `docs/project-structure.md` ทุกครั้งที่ต้องสร้างไฟล์ใหม่

### Checklist ก่อนส่ง Screen

```
[ ] ไม่มี hardcode สี / ขนาด / spacing
[ ] ทุก element ใช้ shared/ component หรือ token
[ ] element inline → report กลับครบแล้ว
[ ] TypeScript ไม่มี error
```

---

## § Component — สร้าง Component ใหม่

ทำตามลำดับนี้เสมอ — ห้ามข้ามขั้น

```
ขั้นที่ 1  สร้างใน Figma DSM
              → อ่าน docs/create-figma-components.md

ขั้นที่ 2  แปลงเป็น Code ใน shared/
              → อ่าน docs/component-api-plan.md
```

### ขั้นที่ 1 — Figma DSM (`docs/create-figma-components.md`)

- สร้าง variant frames → Create Component Set
- Bind ทุก fill / stroke / text ด้วย **DSM variable** (ห้าม hardcode สี)
- Apply **Text Style** จาก library ทุก text node (ห้าม hardcode font)
- วางใน page ที่กำหนด: Primitives (atomic) หรือ Components (composite)

### ขั้นที่ 2 — Code (`docs/component-api-plan.md`)

- สร้างใน `src/components/shared/<name>/` เท่านั้น — ห้ามแก้ `ui/`
- ไฟล์ที่ต้องมี: `<name>.tsx` + `<name>.types.ts` + `<name>.md`
- ใช้ CVA + forwardRef + asChild + cn() ทุก component
- ทุก color ใช้ Tailwind token — ห้าม hardcode
- export `variants` ออกมาด้วยเสมอ

### STOP & ASK ก่อนสร้าง

```
variant / size / asChild ทำได้ไหม?
      ├── ได้  → เพิ่ม variant อย่างเดียว
      └── ไม่ได้ → หยุด รายงาน รอ confirm
```

---

## § Code — แก้ Code / Bug fix

- อ่าน `docs/project-structure.md` ถ้าต้องสร้างไฟล์ใหม่
- ห้าม hardcode ค่าใดๆ — ใช้ token เสมอ
- ห้ามแก้ `src/components/ui/` โดยตรง
- Server Component by default — เพิ่ม `"use client"` เฉพาะเมื่อจำเป็น

---

## กฎที่ใช้กับทุกงาน

```
✅ Token เท่านั้น        → bg-background-default, text-text-primary, border-border-default
✅ Figma คือต้นฉบับ      → code ต้องตาม Figma ไม่ใช่กลับกัน
✅ Report inline elements → ก่อนจะ extract เป็น component ต้องรอ confirm
❌ ห้าม hardcode          → สี / ขนาด / spacing / font ทุกรูปแบบ
❌ ห้ามแก้ ui/            → ต้อง extend ใน shared/ เท่านั้น
❌ ห้ามสร้าง component    → โดยไม่ผ่านขั้นตอน Figma ก่อน
```

---

## Figma Files

| ไฟล์ | Key | หน้าที่ |
|---|---|---|
| DSM (Design System) | `yBBt8LTSVb2toD6MDg1VAf` | source of truth ทุก component |
| Dashboard (Screen) | `ZkhAIxWHezy4Yg1Avkse19` | screen ที่กำลังสร้าง |

---

## เอกสารอ้างอิง

| เอกสาร | อ่านเมื่อ |
|---|---|
| `docs/project-structure.md` | สร้างไฟล์ใหม่ทุกครั้ง |
| `docs/screen-implementation-plan.md` | ขึ้น Screen |
| `docs/create-figma-components.md` | สร้าง Component ใน Figma |
| `docs/component-api-plan.md` | แปลง Component เป็น Code |
| `docs/master-checklist.md` | ดู phase ที่เสร็จแล้ว / ยังค้างอยู่ |
