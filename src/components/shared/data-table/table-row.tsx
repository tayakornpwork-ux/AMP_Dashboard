import React from "react"
import { cn } from "@/lib/utils"
import type { TableRowProps } from "./data-table.types"

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
  ({ cells, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 border-t border-border-default px-5 py-4 transition-colors hover:bg-background-subtle",
        className
      )}
      {...props}
    >
      {cells.map((cell) => (
        <div key={cell.key} className={cell.className}>
          {cell.content}
        </div>
      ))}
    </div>
  )
)
TableRow.displayName = "TableRow"

export { TableRow }
