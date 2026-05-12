import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-text-primary">404</h1>
      <p className="text-text-secondary">ไม่พบหน้าที่ต้องการ</p>
      <Link href="/" className="text-text-link hover:text-text-link-hover underline">
        กลับหน้าหลัก
      </Link>
    </div>
  )
}
