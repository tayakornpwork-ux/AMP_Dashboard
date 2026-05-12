import type { Meta, StoryObj } from "@storybook/react"
import { Mail, Plus, Trash2 } from "lucide-react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
    variant: "default",
    size: "md",
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "subtle", "ghost", "link"],
      description: "รูปแบบของปุ่ม",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon", "icon-circle"],
      description: "ขนาดของปุ่ม",
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Variants ─────────────────────────────────
export const Default: Story = {}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Cancel" },
}

export const Subtle: Story = {
  args: { variant: "subtle", children: "Subtle" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
}

export const Link: Story = {
  args: { variant: "link", children: "Link" },
}

// ── Sizes ─────────────────────────────────────
export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}

// ── Icon ──────────────────────────────────────
export const WithLeftIcon: Story = {
  args: { leftIcon: <Mail />, children: "Login with Email" },
}

export const IconOnly: Story = {
  args: { size: "icon", children: <Plus /> },
}

export const IconCircle: Story = {
  args: { size: "icon-circle", children: <Plus /> },
}

// ── States ────────────────────────────────────
export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledDestructive: Story = {
  args: { variant: "destructive", children: "ลบรายการ", disabled: true },
}

export const Loading: Story = {
  args: { loading: true, children: "กำลังบันทึก..." },
}

// ── All Variants ─────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default" disabled>Default</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="subtle" disabled>Subtle</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
}
