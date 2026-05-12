import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Variants ──────────────────────────────────────────────────────────────────
const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full px-3 py-1",
    "text-xs font-medium leading-4 whitespace-nowrap",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        // Figma: fill=color/brand/blue, text=color/text/inverse
        default: "bg-brand-blue text-text-inverse",
        // Figma: fill=color/background/subtle, stroke=color/border/default, text=color/text/secondary
        secondary:
          "bg-background-subtle border border-border-default text-text-secondary",
        // Figma: fill=color/status/success-bg, stroke=color/status/success-border, text=color/status/success-text
        success:
          "bg-status-success-bg border border-status-success-border text-status-success-text",
        // Figma: fill=color/status/warning-bg, stroke=color/status/warning-border, text=color/status/warning-text
        warning:
          "bg-status-warning-bg border border-status-warning-border text-status-warning-text",
        // Figma: fill=color/status/error-bg, stroke=color/status/error-border, text=color/status/error-text
        destructive:
          "bg-status-error-bg border border-status-error-border text-status-error-text",
        // Figma: no fill, stroke=color/border/default, text=color/text/primary
        outline: "border border-border-default text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ─────────────────────────────────────────────────────────────────
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
