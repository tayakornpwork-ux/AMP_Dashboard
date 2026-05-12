"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputFieldVariants = cva(
  [
    "w-full bg-background-default border border-border-strong rounded-md",
    "text-text-primary placeholder:text-text-placeholder",
    "transition-colors",
    // focus — 2px outer ring ตรงกับ Figma
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-0",
    // disabled — opacity-50 ตรงกับ Figma (ไม่เปลี่ยน bg)
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        // "small" ใน Figma → sm: text-sm (14px), height ~36px
        sm: "h-9 px-3 py-2 text-sm leading-5",
        // "default" ใน Figma → md: text-base (16px), height ~40px
        md: "h-10 px-3 py-2 text-base leading-6",
      },
      error: {
        true: "border-status-error focus-visible:ring-status-error",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputFieldVariants> {
  label?: string
  helperText?: string
  labelPosition?: "top" | "left"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      error,
      label,
      helperText,
      labelPosition = "top",
      leftIcon,
      rightIcon,
      type = "text",
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()

    const inputEl = (
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-tertiary pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          className={cn(
            inputFieldVariants({ size, error }),
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-text-tertiary pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    )

    // ไม่มี label/helperText — return input เดี่ยว
    if (!label && !helperText) return inputEl

    // labelPosition="left" — label อยู่ซ้าย, input อยู่ขวา (Figma: "label to the left")
    if (labelPosition === "left") {
      return (
        <div className="flex items-center gap-4 w-full">
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-text-primary whitespace-nowrap w-[84px] shrink-0"
            >
              {label}
            </label>
          )}
          {inputEl}
        </div>
      )
    }

    // labelPosition="top" (default) — label บน, helper text ล่าง
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}{required && <span className="ml-1 text-status-error-text">*</span>}
          </label>
        )}
        {inputEl}
        {helperText && (
          <p className={cn(
            "text-sm leading-5",
            error ? "text-status-error-text" : "text-text-tertiary"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputFieldVariants }
