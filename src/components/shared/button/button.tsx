"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium text-sm leading-6 rounded-md",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-brand-blue text-text-on-brand",
          "hover:bg-brand-blue-hover",
          "disabled:bg-brand-blue-muted disabled:text-brand-blue-text",
        ],
        destructive: [
          "bg-status-error text-text-on-brand",
          "hover:bg-status-error-hover",
          "disabled:bg-brand-red-muted disabled:text-brand-red-text",
        ],
        outline: [
          "border border-border-default bg-background-default text-text-primary",
          "hover:bg-background-subtle",
          "disabled:border-border-disabled disabled:text-text-tertiary",
        ],
        subtle: [
          "bg-background-subtle text-text-primary",
          "hover:bg-border-default",
          "disabled:text-text-tertiary",
        ],
        ghost: [
          "bg-background-default text-text-primary",
          "hover:bg-background-subtle",
          "disabled:text-text-tertiary",
        ],
        link: [
          "text-text-primary underline-offset-4",
          "hover:underline",
          "disabled:text-text-tertiary",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-5 py-2.5 text-base",
        // icon sizes override variant colors — always use outline style
        icon: [
          "h-8 w-8 p-2 rounded-md",
          "border border-border-default bg-background-default text-text-primary",
          "hover:bg-background-subtle",
          "disabled:text-text-tertiary",
        ],
        "icon-circle": [
          "h-10 w-10 p-3 rounded-full",
          "border border-border-default bg-background-default text-text-primary",
          "hover:bg-background-subtle",
          "disabled:text-text-tertiary",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isIconOnly = size === "icon" || size === "icon-circle"

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {!isIconOnly && children}
          </>
        ) : (
          <>
            {leftIcon && !isIconOnly && (
              <span className="size-4 shrink-0" aria-hidden>
                {leftIcon}
              </span>
            )}
            {isIconOnly ? (
              <span className="size-4" aria-hidden>
                {children}
              </span>
            ) : (
              children
            )}
            {rightIcon && !isIconOnly && (
              <span className="size-4 shrink-0" aria-hidden>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
