import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Shared/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "warning", "destructive", "outline"],
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// ── Single variants ────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { children: "Default" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
}

export const Success: Story = {
  args: { variant: "success", children: "Success" },
}

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
}

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

// ── All variants ───────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

// ── With real-world labels ─────────────────────────────────────────────────────
export const RealWorldLabels: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Rejected</Badge>
      <Badge variant="outline">Archived</Badge>
    </div>
  ),
}

// ── asChild — badge as a link ──────────────────────────────────────────────────
export const AsLink: Story = {
  render: () => (
    <Badge asChild variant="default">
      <a href="#">Clickable</a>
    </Badge>
  ),
}
