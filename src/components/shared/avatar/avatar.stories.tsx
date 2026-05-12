import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Shared/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
  args: {
    size: "md",
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

// ── Image ──────────────────────────────────────────────────────────────────────
export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

// ── Initials (Fallback) ────────────────────────────────────────────────────────
export const WithInitials: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const InitialsOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>TP</AvatarFallback>
    </Avatar>
  ),
}

// ── Sizes ──────────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const AllSizesWithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  ),
}
