import type { Preview } from "@storybook/react"
import "../src/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "subtle", value: "#f8fafc" },
        { name: "dark", value: "#0f172a" },
      ],
    },
    layout: "centered",
  },
}

export default preview
