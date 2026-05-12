import * as React from "react"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  change: string
  trend: "positive" | "negative"
  icon?: React.ReactNode
}
