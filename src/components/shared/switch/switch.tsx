"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
  description?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, id, ...props }, ref) => {
  const switchId = id ?? React.useId()

  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(
          // base — Figma: 44×24, rounded-full track
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent transition-colors",
          // off state — subtle gray track
          "bg-border-strong",
          // on state — brand-blue track
          "data-[state=checked]:bg-brand-blue",
          // focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            // thumb — white circle, 20×20
            "pointer-events-none block h-5 w-5 rounded-full bg-background-default shadow-sm",
            "ring-0 transition-transform",
            // off → on translate
            "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
          )}
        />
      </SwitchPrimitive.Root>

      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label
              htmlFor={switchId}
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
Switch.displayName = "Switch"

export { Switch }
