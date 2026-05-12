# Create Figma Components

ขั้นตอนการสร้าง Component บน Figma สำหรับ [DSM] AMP Dashboard

---

## กฎเหล็ก — Atomic First

> **ก่อนสร้าง composite component ทุกครั้ง ต้องตรวจสอบ Atomic component ก่อนเสมอ**

```
มี element ใดใน component ใหม่?
      ↓
ค้นหาใน DSM ด้วย search_design_system หรือดูที่ Primitives page
      ↓
มี Atomic component → ใช้ instance จาก component set นั้นทันที
      ↓
ไม่มี Atomic component → STOP: ถามกลับมาก่อน ห้ามสร้าง frame เองแทน
```

| ต้องการอะไร | ตรวจสอบที่ |
|---|---|
| Avatar, Button, Badge, Input | Primitives page หรือ `search_design_system` |
| Card, Dialog, Table | Components page |
| สี, ขนาด | Variables / Text Styles ใน DSM library |

**ห้ามวาด element เองถ้ามี Atomic component อยู่แล้ว** — ตัวอย่าง: ถ้าต้องการ Avatar ใน Header ให้ `importComponentSetByKeyAsync` แล้วสร้าง instance ไม่ใช่สร้าง frame วงกลมขึ้นใหม่

---

## ขั้นตอนที่ 1 — สร้าง Component & Variants

1. สร้าง frame สำหรับแต่ละ variant (เช่น default, secondary, success, warning, destructive, outline)
2. Select ทั้งหมด → **Create Component Set** → ได้ COMPONENT_SET
3. ตั้ง variant property ให้ถูกต้อง เช่น `variant=default`, `variant=secondary`

---

## ขั้นตอนที่ 2 — Bind Design System Variables & Styles

> **กฎเหล็ก**: ห้าม hardcode ทั้ง **สี** และ **typography** — ต้อง bind ทุกค่าจาก library `[DSM] AMP Dashboard`

### 2a. Color Variables

ทุก fill, stroke, และ text color ต้อง bind variable จาก library

| Property | Variable ที่ควรใช้ |
|---|---|
| Background | `color/background/…` หรือ `color/brand/…` |
| Border / Stroke | `color/border/…` หรือ `color/status/…-border` |
| Text | `color/text/…` หรือ `color/status/…-text` |

#### ตัวอย่าง mapping

| Variant | Fill | Border | Text |
|---|---|---|---|
| default | `color/brand/blue` | — | `color/text/inverse` |
| secondary | `color/background/subtle` | `color/border/default` | `color/text/secondary` |
| success | `color/status/success-bg` | `color/status/success-border` | `color/status/success-text` |
| warning | `color/status/warning-bg` | `color/status/warning-border` | `color/status/warning-text` |
| destructive | `color/status/error-bg` | `color/status/error-border` | `color/status/error-text` |
| outline | — | `color/border/default` | `color/text/primary` |

### 2b. Text Styles (Typography)

**ห้าม hardcode font family, font style, หรือ font size** — ต้อง apply **Text Style** จาก library เสมอ

| ใช้สำหรับ | Text Style |
|---|---|
| Badge, label เล็ก | `ui/badge` (Noto Looped Thai · Medium · 12px) |
| Label ทั่วไป | `ui/label` (Noto Looped Thai · Medium · 12px) |
| Button | `ui/button` (Noto Looped Thai · Medium · 14px) |
| Body ทั่วไป | `body/subtle` (Noto Looped Thai · Regular · 14px) |
| Body medium | `body/medium` (Noto Looped Thai · Medium · 14px) |
| Heading h2 | `heading/h2` (Noto Looped Thai · SemiBold · 30px) |
| Heading h3 | `heading/h3` (Noto Looped Thai · SemiBold · 24px) |
| Heading h4 | `heading/h4` (Noto Looped Thai · SemiBold · 20px) |

#### วิธี verify ว่า apply Text Style แล้วหรือยัง

เลือก text node → ดูที่ panel **Typography** — ถ้าเห็นชื่อ style (เช่น `ui/badge`) แสดงว่าถูก ถ้าเห็นแค่ font name/size โดยไม่มีชื่อ style = ยัง hardcode

```
✅ ถูก  → Typography panel แสดง "ui/badge"
❌ ผิด  → Typography panel แสดงแค่ "Noto Looped Thai · Medium · 12"
```

---

## ขั้นตอนที่ 3 — วางลงใน Page ที่กำหนด

> **กฎ**: ขึ้นอยู่กับที่ระบุว่าให้สร้างใน page ไหน
>
> | ประเภท | Page ที่วาง | Figma Link |
> |---|---|---|
> | Primitive Component (base/atomic เช่น button, input, badge…) | **Primitives** page | [node-id=1-22](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=1-22) |
> | Component (composite/complex เช่น card, dialog, table…) | **Components** page | [node-id=4-6598](https://www.figma.com/design/yBBt8LTSVb2toD6MDg1VAf/-DSM--AMP-Dashboard?node-id=4-6598) |

สร้าง showcase frame ให้ตรงกับ pattern ของ page แต่ละอัน

โครงสร้างของ showcase frame:

```
Frame (792px wide)
├── header/
│   ├── title-row/
│   │   ├── title-group/
│   │   │   ├── [ชื่อ Component]   ← Text Style: heading/h2, color/text/primary
│   │   │   └── [คำอธิบาย]        ← Text Style: body/lead, color/text/secondary, w=584px
│   │   └── button "View docs"    ← bg color/brand/blue, text color/text/inverse, Text Style: ui/button
│   └── Line (separator)          ← 728px wide
└── variants/
    └── [instance ของแต่ละ variant เรียงแถว, gap=8px]
```

---

## Checklist ก่อน mark ว่าเสร็จ

```
Color
[ ] ทุก fill bind variable → ตรวจด้วย fills[0]?.boundVariables?.color
[ ] ทุก stroke bind variable → ตรวจด้วย strokes[0]?.boundVariables?.color
[ ] ทุก text color bind variable → ตรวจด้วย fills[0]?.boundVariables?.color บน TEXT node

Typography
[ ] ทุก text node มี textStyleId → ตรวจว่า textStyleId ไม่ใช่ null
[ ] Text Style ชื่อปรากฏใน Typography panel (ไม่ใช่แค่ font name/size)
```

---

## กฎสำคัญ

```
❌ ห้าม hardcode สี เช่น #000f9f หรือ rgba(...)
❌ ห้าม hardcode font family / style / size โดยไม่ apply Text Style
❌ ห้ามสร้าง variant ที่ไม่มีใน design system
✅ ทุก color property ต้อง bind variable เสมอ
✅ ทุก text node ต้อง apply Text Style เสมอ
✅ Figma คือต้นฉบับ — code ต้องตาม Figma ไม่ใช่กลับกัน
```

---

## Pattern ที่ต้องจำ (เรียนรู้จากปัญหาจริง)

### 1. Recheck Component Node โดยตรง — ไม่ใช่แค่ Showcase

Showcase อาจมี layer ที่เพิ่มไว้ภายนอก component definition เช่น composite ของหลาย instance ที่ไม่ได้เป็นส่วนหนึ่งของ component จริงๆ

```
✅ ดู design context ของ component node เสมอ (เช่น 1281:807)
❌ ไม่ใช้ showcase node (เช่น 1281:808) เป็นอ้างอิง structure ของ component
```

### 2. ใช้ Instance จาก Atomic Component เสมอ

ห้ามวาด button, badge, หรือ element อื่นขึ้นใหม่ใน composite component — ต้อง drag instance จาก component set ที่มีอยู่แล้ว

```
✅ ใช้ instance ของ Button component set เมื่อต้องการ button ใน card, dialog ฯลฯ
❌ ห้ามสร้าง frame แล้วจัด style เองให้ดูเหมือน button
```

### 3. Re-apply `textStyleId` ทุกครั้งหลัง Set Characters (Plugin API)

Figma Plugin API จะ reset text style เมื่อ set `characters` — ต้อง re-apply `textStyleId` ทุกครั้ง

```js
// ✅ ลำดับที่ถูก
node.fontName   = { family: 'Noto Looped Thai', style: 'Medium' } // load font ก่อน
node.characters = 'ข้อความ'
node.textStyleId = uiButtonStyle.id                                // re-apply หลัง set characters
```

### 4. Verify Variable Binding หลัง Insert Instance

Instance ที่ insert เข้า component ใหม่อาจ override fill เป็น hardcode อัตโนมัติ — ต้องตรวจและ rebind เสมอ

```js
// ✅ ตรวจหลัง insert
const bound = instance.fills[0]?.boundVariables?.color
// ถ้าไม่มี → rebind ด้วย setBoundVariableForPaint
instance.fills = [figma.variables.setBoundVariableForPaint(paint, 'color', variable)]
```
