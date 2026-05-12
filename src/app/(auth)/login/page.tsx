import type { Metadata } from "next"

export const metadata: Metadata = { title: "เข้าสู่ระบบ" }

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border-default bg-background-card p-8 shadow-md">
      <h1 className="mb-6 text-xl font-semibold text-text-primary">เข้าสู่ระบบ</h1>
      {/* LoginForm component จะ implement ใน Phase 3 */}
    </div>
  )
}
