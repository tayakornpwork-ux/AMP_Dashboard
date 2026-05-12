import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/shared/card/card"
import type { StatCardProps } from "./stat-card.types"

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, change, trend, icon, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("relative overflow-hidden border-border-default p-5", className)}
        {...props}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-brand-yellow" />
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            {label}
          </p>
          {icon && (
            <span className="text-text-tertiary" aria-hidden>
              {icon}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-3xl font-bold text-text-primary">{value}</p>
          <span
            className={cn(
              "text-sm font-medium",
              trend === "positive" ? "text-status-success-text" : "text-status-error-text"
            )}
          >
            {change}
          </span>
        </div>
      </Card>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
