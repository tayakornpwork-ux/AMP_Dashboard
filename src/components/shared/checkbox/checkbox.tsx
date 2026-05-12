"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, ...props }, ref) => {
  const checkboxId = id ?? React.useId()

  return (
    <div className="flex items-start gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          // base — ตรงกับ Figma: border, rounded, bg-default
          "peer h-4 w-4 shrink-0 rounded-sm border border-border-strong bg-background-default",
          "transition-colors mt-1",
          // focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          // checked — bg-brand-blue ตรงกับ Figma Option B
          "data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue data-[state=checked]:text-text-on-brand",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-border-disabled",
          // disabled + checked — ใช้ muted colors ตาม Option B
          "disabled:data-[state=checked]:bg-brand-blue-muted disabled:data-[state=checked]:border-brand-blue-muted",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="size-3 stroke-[3]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-text-primary leading-5 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:text-text-disabled"
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
Checkbox.displayName = "Checkbox"

export { Checkbox }
