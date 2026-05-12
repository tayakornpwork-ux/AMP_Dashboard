# stores/

Client-side global state — ใช้เมื่อ state ต้องการ share ข้าม components หลาย levels

## เมื่อไหร่ถึงใช้ store

- UI state ที่ share ข้าม features (sidebar open/close, theme, notifications)
- ไม่ใช้สำหรับ server data — ใช้ SWR/React Query แทน

## เทคโนโลยีแนะนำ

- Zustand สำหรับ simple global state
- Jotai สำหรับ atomic state
