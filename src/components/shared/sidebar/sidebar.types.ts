import type { LucideIcon } from "lucide-react"

export interface NavItem {
  href: string
  icon: LucideIcon
  label: string
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  defaultCollapsed?: boolean
}
