import * as React from "react"
import { cn } from "@/lib/utils"
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./card.types"

// ── Card ─────────────────────────────────────────────────────────────────────
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-background-default border border-border-strong rounded-lg",
        "flex flex-col",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

// ── CardHeader ────────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// ── CardTitle ─────────────────────────────────────────────────────────────────
// Figma: body/large — 18px SemiBold, lh 28px, text-primary
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-[18px] font-semibold leading-7 text-text-primary",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// ── CardDescription ───────────────────────────────────────────────────────────
// Figma: body/subtle — 14px Regular, lh 20px, text-tertiary
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm leading-5 text-text-tertiary", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// ── CardDivider ───────────────────────────────────────────────────────────────
// Figma: div with bg-border-default h-px (fill, not border-top)
const CardDivider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px w-full bg-border-default shrink-0", className)}
      {...props}
    />
  )
)
CardDivider.displayName = "CardDivider"

// ── CardContent ───────────────────────────────────────────────────────────────
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col p-6", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

// ── CardFooter ────────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2 px-6 pb-6", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardDivider,
  CardContent,
  CardFooter,
}
