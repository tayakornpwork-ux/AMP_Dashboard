import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
  disabled?: boolean
  external?: boolean
}

export type NavGroup = {
  title?: string
  items: NavItem[]
}

// กำหนด navigation structure — เพิ่ม items ตาม screens ที่จะสร้างใน Phase 5
export const dashboardNav: NavGroup[] = [
  {
    items: [
      { title: "Dashboard", href: "/dashboard" },
    ],
  },
]
