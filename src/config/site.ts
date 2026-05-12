export const siteConfig = {
  name: "AMP Dashboard",
  description: "AMP Dashboard — Internal management platform",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const

export type SiteConfig = typeof siteConfig
