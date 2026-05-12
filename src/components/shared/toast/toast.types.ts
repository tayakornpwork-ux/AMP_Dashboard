import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { toastVariants } from "./toast"

export type ToastVariant = "default" | "success" | "warning" | "destructive"

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

export interface ToastTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface ToastContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ToastCloseProps extends React.HTMLAttributes<HTMLButtonElement> {}
