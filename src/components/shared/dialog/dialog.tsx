import * as React from "react"
import { cn } from "@/lib/utils"
import type {
  DialogProps,
  DialogHeaderProps,
  DialogTitleGroupProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogDividerProps,
  DialogContentProps,
  DialogFooterProps,
} from "./dialog.types"

// ── Dialog ────────────────────────────────────────────────────────────────────
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col w-[480px] bg-background-default border border-border-strong rounded-lg shadow-lg",
        className
      )}
      {...props}
    />
  )
)
Dialog.displayName = "Dialog"

// ── DialogHeader ──────────────────────────────────────────────────────────────
// Figma: flex justify-between, pt-6 pb-4 px-6
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between pt-6 pb-4 px-6", className)}
      {...props}
    />
  )
)
DialogHeader.displayName = "DialogHeader"

// ── DialogTitleGroup ──────────────────────────────────────────────────────────
// Figma: flex-col gap-2 flex-1 — wraps DialogTitle + DialogDescription
const DialogTitleGroup = React.forwardRef<HTMLDivElement, DialogTitleGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 flex-1 min-w-0", className)}
      {...props}
    />
  )
)
DialogTitleGroup.displayName = "DialogTitleGroup"

// ── DialogTitle ───────────────────────────────────────────────────────────────
// Figma: heading/h4 — SemiBold 20px, leading-7, tracking-tight, text-primary
const DialogTitle = React.forwardRef<HTMLParagraphElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xl font-semibold leading-7 tracking-tight text-text-primary", className)}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

// ── DialogDescription ─────────────────────────────────────────────────────────
// Figma: body/subtle — Regular 14px, leading-5, text-secondary
const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm leading-5 text-text-secondary", className)}
      {...props}
    />
  )
)
DialogDescription.displayName = "DialogDescription"

// ── DialogClose ───────────────────────────────────────────────────────────────
// Figma: 24x24, ✕ Inter Regular 14px, text-tertiary
const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "shrink-0 w-6 h-6 flex items-center justify-center rounded",
        "text-sm text-text-tertiary",
        "hover:text-text-secondary transition-colors",
        className
      )}
      aria-label="Close"
      {...props}
    >
      ✕
    </button>
  )
)
DialogClose.displayName = "DialogClose"

// ── DialogDivider ─────────────────────────────────────────────────────────────
const DialogDivider = React.forwardRef<HTMLDivElement, DialogDividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px w-full bg-border-default shrink-0", className)}
      {...props}
    />
  )
)
DialogDivider.displayName = "DialogDivider"

// ── DialogContent ─────────────────────────────────────────────────────────────
// Figma: px-6 py-4, flex-col
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col px-6 py-4", className)}
      {...props}
    />
  )
)
DialogContent.displayName = "DialogContent"

// ── DialogFooter ──────────────────────────────────────────────────────────────
// Figma: flex justify-end gap-2, px-6 pt-4 pb-6
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2 px-6 pt-4 pb-6", className)}
      {...props}
    />
  )
)
DialogFooter.displayName = "DialogFooter"

export {
  Dialog,
  DialogHeader,
  DialogTitleGroup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogDivider,
  DialogContent,
  DialogFooter,
}
