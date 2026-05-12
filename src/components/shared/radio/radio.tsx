"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

// ── RadioGroup ────────────────────────────────────────────────────────────────
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
RadioGroup.displayName = "RadioGroup"

// ── RadioItem ─────────────────────────────────────────────────────────────────
export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string
  description?: string
}

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const itemId = id ?? React.useId()

  return (
    <div className="flex items-start gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        className={cn(
          // base — Figma: 16×16, circle, border-border-strong
          "h-4 w-4 shrink-0 rounded-full border border-border-strong bg-background-default",
          "transition-colors mt-1",
          // focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          // checked — border turns brand-blue
          "data-[state=checked]:border-brand-blue",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          {/* inner dot — brand-blue filled circle */}
          <div className="h-2 w-2 rounded-full bg-brand-blue" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label
              htmlFor={itemId}
              className="text-sm font-medium text-text-primary leading-5 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-text-secondary leading-4">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})
RadioItem.displayName = "RadioItem"

export { RadioGroup, RadioItem }
