# DataTable

## Figma Reference
- File: [DSM] AMP Dashboard (`yBBt8LTSVb2toD6MDg1VAf`)
- `TableHeader` — Primitives page (node-id: 1363:489)
- `TableRow` — Primitives page (node-id: 1363:522, state=Default | Hover)
- `DataTable` — Components page (node-id: 1356:876)

---

## Atomic Components

### TableHeader

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `columns` | `TableHeaderColumn[]` | — | รายการคอลัมน์ที่จะแสดง label |
| `className` | `string` | — | override class ของ row |

```tsx
import { TableHeader } from "@/components/shared/data-table/table-header"

<TableHeader
  columns={[
    { key: "name",   label: "ผู้ติดต่อ",  className: "flex-[2]" },
    { key: "status", label: "สถานะ",       className: "flex-1" },
  ]}
/>
```

---

### TableRow

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `cells` | `TableRowCell[]` | — | content ของแต่ละ cell ในแถว |
| `className` | `string` | — | override class ของ row |

```tsx
import { TableRow } from "@/components/shared/data-table/table-row"

<TableRow
  cells={[
    { key: "name",   className: "flex-[2]", content: <span>สารา มิลเลอร์</span> },
    { key: "status", className: "flex-1",   content: <Badge variant="success">ผ่านแล้ว</Badge> },
  ]}
/>
```

---

## Composite Component — DataTable

| Prop | Type | Default | หมายเหตุ |
|---|---|---|---|
| `columns` | `DataTableColumn<TRow>[]` | — | config คอลัมน์ + render function |
| `data` | `TRow[]` | — | ข้อมูลแต่ละแถว |
| `keyExtractor` | `(row: TRow) => string` | — | unique key ต่อ row |
| `title` | `string` | — | หัวตาราง (ถ้าไม่ส่ง ไม่แสดง title bar) |
| `actionLabel` | `string` | — | ข้อความปุ่ม action มุมขวา |
| `onAction` | `() => void` | — | callback เมื่อกดปุ่ม action |
| `className` | `string` | — | override class ของ wrapper |

```tsx
import { DataTable } from "@/components/shared/data-table/data-table"

<DataTable
  title="ลีดล่าสุด"
  actionLabel="ดูไปป์ไลน์ →"
  onAction={() => router.push("/pipeline")}
  columns={[
    {
      key: "contact",
      label: "ผู้ติดต่อ",
      className: "flex-[2] min-w-0",
      render: (row) => <span>{row.name}</span>,
    },
    {
      key: "status",
      label: "สถานะ",
      className: "flex-1",
      render: (row) => <Badge variant={row.statusVariant}>{row.status}</Badge>,
    },
  ]}
  data={leads}
  keyExtractor={(row) => row.email}
/>
```

---

## โครงสร้างไฟล์

```
src/components/shared/data-table/
├── table-header.tsx      ← atomic: column labels row
├── table-row.tsx         ← atomic: data row (Default/Hover)
├── data-table.tsx        ← composite: TableHeader + TableRows
├── data-table.types.ts   ← types ทั้งหมด
└── data-table.md
```

## Notes
- `DataTableColumn<TRow>` extends `TableHeaderColumn` — ใช้ type เดียวกันทั้ง atomic และ composite
- `TableRow` มี hover state (`hover:bg-background-subtle`) ใน CSS — ไม่ต้องส่ง prop
- column widths กำหนดผ่าน `className` (เช่น `flex-[2]`, `w-[120px]`, `flex-1`)
