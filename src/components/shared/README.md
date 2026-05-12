# shared/

Reusable components ที่ใช้ข้าม features หลายอย่าง

## กฎการใช้งาน

- ต้องไม่มี business logic ที่ specific กับ feature ใดหนึ่ง
- Import โดยตรง ห้าม re-export ผ่าน index.ts (bundle-barrel-imports)
- แต่ละ component อยู่ใน folder ของตัวเอง พร้อม types ที่เกี่ยวข้อง

## โครงสร้าง

```
shared/
├── data-table/
│   ├── data-table.tsx
│   └── data-table-column-header.tsx
├── page-header/
│   └── page-header.tsx
├── stat-card/
│   └── stat-card.tsx
└── ...
```
