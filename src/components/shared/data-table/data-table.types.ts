import type { ReactNode } from "react"

// ── Atomic ────────────────────────────────────────────────────────────────────

export interface TableHeaderColumn {
  key: string
  label: string
  className?: string
}

export interface TableHeaderProps {
  columns: TableHeaderColumn[]
  className?: string
}

export interface TableRowCell {
  key: string
  className?: string
  content: ReactNode
}

export interface TableRowProps {
  cells: TableRowCell[]
  className?: string
}

// ── Composite ─────────────────────────────────────────────────────────────────

export interface DataTableColumn<TRow> extends TableHeaderColumn {
  render: (row: TRow) => ReactNode
}

export interface DataTableProps<TRow> {
  columns: DataTableColumn<TRow>[]
  data: TRow[]
  keyExtractor: (row: TRow) => string
  title?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}
