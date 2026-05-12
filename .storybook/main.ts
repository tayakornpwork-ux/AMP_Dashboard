import path from "path"
import type { StorybookConfig } from "@storybook/experimental-nextjs-vite"
import type { InlineConfig } from "vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.{ts,tsx}"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config): Promise<InlineConfig> {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": path.resolve(__dirname, "../src"),
        },
      },
    }
  },
}

export default config
