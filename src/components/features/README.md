# features/

Components ที่ผูกกับ business logic ของ feature เฉพาะ

## โครงสร้าง

```
features/
├── dashboard/           # Dashboard feature
│   ├── dashboard-overview.tsx
│   └── ...
├── auth/               # Authentication feature
│   ├── login-form.tsx
│   └── ...
└── ...
```

## กฎการใช้งาน

- แต่ละ feature folder มี components ของตัวเอง
- ห้าม import ข้าม feature folders โดยตรง — ใช้ shared/ แทน
- Server Components by default — เพิ่ม "use client" เฉพาะเมื่อจำเป็น
