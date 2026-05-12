import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { ToastVariant, ToastProps, ToastTitleProps, ToastDescriptionProps, ToastContentProps, ToastCloseProps } from "./toast.types"

// ── Variants ──────────────────────────────────────────────────────────────────
const toastVariants = cva(
  [
    "flex gap-3 items-start",
    "w-[360px] p-4 rounded-lg border shadow-md",
  ],
  {
    variants: {
      variant: {
        // Figma: bg=color/background/default, border=color/border/default
        default: "bg-background-default border-border-default",
        // Figma: bg=color/status/success-bg, border=color/status/success-border
        success: "bg-status-success-bg border-status-success-border",
        // Figma: bg=color/status/warning-bg, border=color/status/warning-border
        warning: "bg-status-warning-bg border-status-warning-border",
        // Figma: bg=color/status/error-bg, border=color/status/error-border
        destructive: "bg-status-error-bg border-status-error-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const toastTitleVariants = cva("text-sm font-medium leading-6", {
  variants: {
    variant: {
      // Figma: color/text/primary
      default: "text-text-primary",
      // Figma: color/status/success-text
      success: "text-status-success-text",
      // Figma: color/status/warning-text
      warning: "text-status-warning-text",
      // Figma: color/status/error-text
      destructive: "text-status-error-text",
    },
  },
  defaultVariants: { variant: "default" },
})

// ── Context — passes variant down to ToastTitle automatically ─────────────────
const ToastContext = React.createContext<{ variant: ToastVariant }>({ variant: "default" })

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <ToastContext.Provider value={{ variant: variant ?? "default" }}>
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    </ToastContext.Provider>
  )
)
Toast.displayName = "Toast"

// ── ToastContent ──────────────────────────────────────────────────────────────
const ToastContent = React.forwardRef<HTMLDivElement, ToastContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 flex-1 min-w-0", className)}
      {...props}
    />
  )
)
ToastContent.displayName = "ToastContent"

// ── ToastTitle ────────────────────────────────────────────────────────────────
const ToastTitle = React.forwardRef<HTMLParagraphElement, ToastTitleProps>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(ToastContext)
    return (
      <p
        ref={ref}
        className={cn(toastTitleVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
ToastTitle.displayName = "ToastTitle"

// ── ToastDescription ──────────────────────────────────────────────────────────
// Figma: body/subtle — text-secondary across all variants
const ToastDescription = React.forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm leading-5 text-text-secondary", className)}
      {...props}
    />
  )
)
ToastDescription.displayName = "ToastDescription"

// ── ToastClose ────────────────────────────────────────────────────────────────
// Figma: 20x20, ✕ Inter Regular 14px, text-tertiary
const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "shrink-0 w-5 h-5 flex items-center justify-center",
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
ToastClose.displayName = "ToastClose"

export {
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  toastVariants,
  toastTitleVariants,
}
