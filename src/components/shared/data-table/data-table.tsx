import React from "react"
import { cn } from "@/lib/utils"
import { TableHeader } from "./table-header"
import { TableRow } from "./table-row"
import type { DataTableProps } from "./data-table.types"

function DataTable<TRow>({
  columns,
  data,
  keyExtractor,
  title,
  actionLabel,
  onAction,
  className,
}: DataTableProps<TRow>) {
  const headerColumns = columns.map((col) => ({
    key: col.key,
    label: col.label,
    className: col.className,
  }))

  return (
    <div className={cn("rounded-lg border border-border-default bg-background-default", className)}>
      {title && (
        <>
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-base font-semibold text-text-primary">{title}</h2>
            {actionLabel && (
              <button
                onClick={onAction}
                className="text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-hover"
              >
                {actionLabel}
              </button>
            )}
          </div>
          <div className="h-px bg-border-default" />
        </>
      )}

      <TableHeader columns={headerColumns} />

      {data.map((row) => (
        <TableRow
          key={keyExtractor(row)}
          cells={columns.map((col) => ({
            key: col.key,
            className: col.className,
            content: col.render(row),
          }))}
        />
      ))}
    </div>
  )
}

DataTable.displayName = "DataTable"

export { DataTable }
