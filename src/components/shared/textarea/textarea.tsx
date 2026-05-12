"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  resize?: "none" | "vertical" | "horizontal" | "both"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, resize = "vertical", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // base — ตรงกับ Figma: bg-default, border-strong, rounded-md, px-3 py-2
          "w-full min-h-[80px] bg-background-default border border-border-strong rounded-md",
          "font-normal text-sm leading-5 text-text-primary",
          "placeholder:text-text-placeholder",
          "transition-colors",
          // focus
          "focus-visible:outline-none focus-visible:border-border-focus focus-visible:ring-1 focus-visible:ring-border-focus",
          // disabled
          "disabled:bg-background-subtle disabled:border-border-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled disabled:cursor-not-allowed",
          // error
          error && "border-status-error focus-visible:border-status-error focus-visible:ring-status-error",
          // resize
          resize === "none" && "resize-none",
          resize === "vertical" && "resize-y",
          resize === "horizontal" && "resize-x",
          resize === "both" && "resize",
          "px-3 py-2",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
