import type { Metadata } from "next"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AMP Dashboard",
    template: "%s | AMP Dashboard",
  },
  description: "AMP Dashboard — Internal management platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  )
}
