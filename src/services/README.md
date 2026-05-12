# services/

Server-side data fetching functions — ใช้ใน Server Components และ Server Actions เท่านั้น

## กฎการใช้งาน

- ทุก function ใช้ React.cache() สำหรับ per-request deduplication (server-cache-react)
- Parallel fetch ด้วย Promise.all() ทุกครั้งที่ requests เป็น independent (async-parallel)
- ห้าม import ใน Client Components

## ตัวอย่าง

```ts
import { cache } from "react"

export const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
})
```
