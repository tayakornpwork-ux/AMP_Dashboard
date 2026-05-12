"use client"

import React, { useState, useRef, useEffect } from "react"
import { MoreVertical, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/shared/avatar/avatar"
import { cn } from "@/lib/utils"
import type { HeaderProps } from "./header.types"

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ user, onLogout, className, ...props }, ref) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <header
        ref={ref}
        className={cn(
          "flex shrink-0 items-center justify-end border-b border-border-default bg-background-default px-6 py-3",
          className
        )}
        {...props}
      >
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-md p-1 transition-colors hover:bg-background-subtle"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-blue text-xs text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-left leading-tight">
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-tertiary">{user.role}</p>
            </div>
            <MoreVertical className="h-4 w-4 text-text-tertiary" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border-default bg-background-default py-1 shadow-md">
              <button
                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-status-error-text transition-colors hover:bg-background-subtle"
                onClick={() => { setOpen(false); onLogout?.() }}
              >
                <LogOut className="h-4 w-4" />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
