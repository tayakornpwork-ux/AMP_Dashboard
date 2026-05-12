"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ClipboardList, Layers, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SidebarProps, NavItem } from "./sidebar.types"

const navItems: NavItem[] = [
  { href: "/my-tasks", icon: ClipboardList, label: "งานของฉัน" },
  { href: "/lead-pool", icon: Layers, label: "คลังลีด" },
]

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ defaultCollapsed = false, className, ...props }, ref) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    const pathname = usePathname()

    useEffect(() => {
      if (window.innerWidth < 1024) setCollapsed(true)
    }, [])

    return (
      <aside
        ref={ref}
        className={cn(
          "flex shrink-0 flex-col border-r border-border-default bg-background-default transition-all duration-300",
          collapsed ? "w-14" : "w-52",
          className
        )}
        {...props}
      >
        {/* Logo + Hamburger */}
        <div className={cn(
          "flex h-[68px] items-center gap-3 overflow-hidden",
          collapsed ? "justify-center px-0" : "px-4"
        )}>
          {!collapsed && (
            <Image src="/images/logo-horizontal.svg" alt="AMP" width={112} height={28} className="flex-1" />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-md p-1 text-text-secondary transition-colors hover:bg-background-subtle hover:text-text-primary"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-2 px-2 pt-6">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  collapsed && "justify-center",
                  isActive
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:bg-background-subtle hover:text-text-primary"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
