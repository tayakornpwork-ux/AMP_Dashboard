import type { Meta, StoryObj } from "@storybook/react"
import { Search, Mail } from "lucide-react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Shared/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Email",
    size: "md",
    error: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    labelPosition: {
      control: "select",
      options: ["top", "left"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// ── Basic ──────────────────────────────────────
export const Default: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

// ── With Label & Helper ────────────────────────
export const WithLabel: Story = {
  args: {
    label: "Email",
    helperText: "Enter your email address",
    placeholder: "Email",
  },
}

export const LabelToTheLeft: Story = {
  args: {
    label: "Width",
    labelPosition: "left",
    placeholder: "Add value",
  },
}

// ── States ─────────────────────────────────────
export const Focused: Story = {
  args: { label: "Email", placeholder: "Email", autoFocus: true },
}

export const Completed: Story = {
  args: { label: "Email", defaultValue: "pietro.schirano@gmail.com" },
}

export const Error: Story = {
  args: {
    label: "Email",
    helperText: "กรุณากรอกอีเมลให้ถูกต้อง",
    placeholder: "Email",
    error: true,
  },
}

export const Disabled: Story = {
  args: { label: "Email", placeholder: "Email", disabled: true },
}

// ── With Icons ──────────────────────────────────
export const WithLeftIcon: Story = {
  args: { leftIcon: <Search />, placeholder: "ค้นหา..." },
}

export const WithRightIcon: Story = {
  args: { rightIcon: <Mail />, placeholder: "อีเมล" },
}

// ── Sizes ───────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="md" label="Default size" placeholder="Email" />
      <Input size="sm" label="Small size" placeholder="Email" />
    </div>
  ),
}

// ── Input + Button (composition) ────────────────
export const WithButton: Story = {
  render: () => (
    <div className="flex gap-2 w-96">
      <Input placeholder="Email" />
      <button className="shrink-0 bg-text-primary text-text-on-dark px-4 py-2 rounded-md text-sm font-medium">
        Subscribe
      </button>
    </div>
  ),
}
