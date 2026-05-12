// ─── Common Types ──────────────────────────────────────────────────────────────

export type WithClassName<T = object> = T & { className?: string }

export type ApiResponse<T> = {
  data: T
  message?: string
  success: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export type Status = "success" | "warning" | "error" | "info" | "neutral"

export type Size = "sm" | "md" | "lg"
