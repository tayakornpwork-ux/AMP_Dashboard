import React from "react"
import { cn } from "@/lib/utils"
import type { TableHeaderProps } from "./data-table.types"

const TableHeader = React.forwardRef<HTMLDivElement, TableHeaderProps>(
  ({ columns, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 bg-background-default px-5 py-3", className)}
      {...props}
    >
      {columns.map((col) => (
        <div key={col.key} className={cn("text-xs font-semibold uppercase tracking-wider text-text-tertiary", col.className)}>
          {col.label}
        </div>
      ))}
    </div>
  )
)
TableHeader.displayName = "TableHeader"

export { TableHeader }
