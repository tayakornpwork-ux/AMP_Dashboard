import { Noto_Sans_Thai_Looped } from "next/font/google"

// Hoist to module level — server-hoist-static-io (Vercel best practice)
export const fontSans = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})
