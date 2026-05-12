# actions/

Next.js Server Actions — form submissions, mutations

## กฎการใช้งาน

- ทุก action ต้องมี "use server" directive
- Validate input ก่อนทุกครั้ง (server-auth-actions)
- Return typed response อย่างสม่ำเสมอ

## ตัวอย่าง

```ts
"use server"

export async function createItem(formData: FormData) {
  // 1. Validate
  // 2. Auth check
  // 3. Mutate
  // 4. Revalidate cache
  revalidatePath("/dashboard")
}
```
